import { Request, Response } from 'express'
import { PrismaClient, User } from '@prisma/client'
import { iUser } from 'src/@types/endpoints'
import { hash } from 'bcrypt'
import { status200, status400, status500 } from './response/status'
import generateToken from './token/generateToken'
import { randomBytes } from 'crypto'
import sgMail from '@sendgrid/mail'

const prisma = new PrismaClient()

// GET
export const index = async (req: Request, res: Response) => {
  try {
    // SEARCH USERS
    const usersData = await prisma.user.findMany()

    const users = usersData.map((user: User) => {
      return ({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        height: user.height
      })
    })

    // RETURN
    status200('Pesquisa realizada!')
    res.status(200).send(users)

    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

// GET
export const singleUser = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idUser: string = String(req.params.id.trim())

    // VERIFY INPUT
    if (idUser === undefined || idUser === null || idUser === '') {
      return res.status(400).send(status400('O ID fornecido é invalido!'))
    }

    // SEARCH USER
    try {
      const user: User | null = await prisma.user.findUnique({
        where: { id: idUser }
      })

      if (user === undefined || user === null) {
        return res.status(400).send(status400('O ID fornecido é invalido!'))
      }

      // RETURN
      status200('Pesquisa realizada!')
      res.status(200).send({
        id: user?.id,
        name: user?.name,
        lastName: user?.lastName,
        email: user?.email,
        height: user?.height
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(status400('O ID fornecido é invalido!'))
    }

    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

// POST
export const create = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const { name, lastName, email, password, height }: iUser = req.body
    const inputs = [name, lastName, email, password, height]

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        return res.status(400).send(status400('Preencha todos os campos!'))
      }
    }

    if (password.length < 6 || password.length > 16) {
      return res.status(400).send(status400('A senha deve contar mais de 6 caracteres e no máximo 16!'))
    }

    if ((/\s/g).test(password) === true) {
      return res.status(400).send(status400('A senha não pode haver espaços!'))
    }

    // eslint-disable-next-line
    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null) {
      return res.status(400).send(status400('Email invalido!'))
    }

    // VERIFY EMAIL
    const searchEmailUser = await prisma.user.findMany({ where: { email } })

    if (searchEmailUser.length !== 0) {
      return res.status(400).send(status400('Email já cadastrado!'))
    }

    // HASH PASSWORD
    const hashedPassword: string = await hash(password, 10)

    // REGISTER USER
    const userData = await prisma.user.create({
      data: {
        name: String(name).trim(),
        lastName: String(lastName).trim(),
        email: String(email).trim(),
        height: Number(height),
        password: hashedPassword
      }
    })

    // RETURN
    status200('Usuário Cadastrado!')
    return res.status(200).send({
      id: userData.id,
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      height: userData.height,
      token: await generateToken(userData.id)
    })

  // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

// PUT
export const update = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idUser: string = String(req.params.id)
    const { name, lastName, email } = req.body
    const Height: number = Number(req.body.height)
    const inputs = [idUser, name, lastName, email, Height]
    const idUserAuth: string = req.body.idUserAuth

    // VERIFY AUTH
    if (idUserAuth !== idUser) {
      return res.status(401).send(status400('Usuário não autorizado!'))
    }

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        return res.status(400).send(status400('Preencha todos os campos!'))
      }
    }

    try {
      // UPADTE USER
      await prisma.user.update({
        where: { id: idUser },
        data: {
          name: String(name.trim()),
          lastName: String(lastName.trim()),
          email: String(email),
          height: Height
        }
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(status400('Usúario inexistente!'))
    }

    // RETURN
    status200('Usuário atualizado!')
    res.status(204).send('Usuário atualizado!')

  // ERROR!
  } catch (error) {
    return res.status(500).send(status500(error))
  }
}

// PUT
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const email : string = req.body.email

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).send(status400('Usuário não encontrado!'))
    }

    const newPassword = randomBytes(8).toString('hex')

    // SEND EMAIL
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

    sgMail.send({
      from: 'samuelcs131@gmail.com',
      to: email,
      subject: 'Recuperação de senha',
      text: `Sua nova senha é: ${newPassword}`

    }).then(
      async () => {
        const password = await hash(newPassword, 10)

        await prisma.user.update({ where: { email }, data: { password } })

        return res.status(204).send(status200('Senha enviada ao email!'))
      }
    // ERROR
    ).catch(
      async (error: any) => {
        console.log(error)
        return res.status(500).send(status500('Não foi possivel enviar email!'))
      }
    )
  // ERROR
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

// DELETE
export const exclude = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idUser: string = String(req.params.id)
    const idUserAuth: string = req.body.idUserAuth

    // VERIFY AUTH
    if (idUserAuth !== idUser) {
      return res.status(401).send(status400('Usuário não autorizado!'))
    }

    // DELETE USER
    try {
      // DELETE TRAINING
      await prisma.training.deleteMany({
        where: { userId: idUser }
      })

      // DELETE MEASUREMENTS
      await prisma.bodyMeasurements.deleteMany({
        where: { userId: idUser }
      })

      await prisma.user.delete({
        where: { id: idUser }
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(status400('Usúario inexistente!'))
    }

    // RETURN
    status200('Usuário excluido!')
    res.status(204).send('Usuário excluido!')
  // ERROR!
  } catch (error) {
    return res.status(500).send(status500(error))
  }
}
