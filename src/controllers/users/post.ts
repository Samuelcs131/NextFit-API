import { Request, Response } from 'express'
import { PrismaClient, User } from '@prisma/client'
import { hash } from 'bcrypt'
import { status200, status400, status500 } from '../response/status'
/* eslint-disable-next-line */
import { generateTokenUser, varifyApiKey } from '../token/generateToken'
import { randomBytes } from 'crypto'
import sgMail from '@sendgrid/mail'
import dateNow from '@resources/dateNow'

const prisma = new PrismaClient()

// CREATE USER
export const createUser = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const { name, lastName, email, password, height, weight, sex }: User = req.body.body || req.body
    const inputs = [name, lastName, email, password, height, weight, sex]
    const optionsSex = ['m', 'f']

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        return res.status(400).send(status400(`Preencha todos os campos! ${[num]}`))
      }
    }

    if (password.length < 8 || password.length > 32) {
      return res.status(400).send(status400('A senha deve contar mais de 8 caracteres e no máximo 32!'))
    }

    if ((/\s/g).test(password) === true) {
      return res.status(400).send(status400('A senha não pode haver espaços!'))
    }

    // @ts-ignore
    if (!optionsSex.includes(sex)) {
      return res.status(400).send(status400('Selecione seu sexo!'))
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
        password: hashedPassword,
        sex: String(sex),
        weight: Number(weight),
        passwordResetExpires: new Date('2000-01-01'),
        passwordResetToken: 'initial'
      }
    })

    // RETURN
    status200('Usuário Cadastrado!')
    return res.status(200).send({
      user: {
        id: userData.id,
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        height: userData.height,
        weight: userData.weight,
        sex: userData.sex
      },
      token: await generateTokenUser(userData.id)
    })

    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

// FORGOT PASSWORD
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const email : string = req.body.email.trim()

    // VERIFY INPUTS
    // eslint-disable-next-line
      if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null) {
      return res.status(400).send(status400('Email invalido!'))
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).send(status400('Usuário não encontrado!'))
    }

    if (dateNow < user.passwordResetExpires) {
      return res.status(400).send(status400('Email já foi enviado aguarde um tempo para solicitar novamente!'))
    }

    // DATE
    dateNow.setHours(dateNow.getHours() + 2)

    // TOKEN RESET PASSWORD
    const token = randomBytes(20).toString('hex')

    // SEND EMAIL
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

    sgMail.send({
      from: 'samuelcs131@gmail.com',
      to: email,
      subject: 'Recupere sua senha | NextFit',
      html: ` <h1>Roi gata kk</h1>
        <p>Esqueceu a senha né vacilona?!</p>
        <p>Não tem problema, é muito fácil criar uma nova é só arrastar pra cima! brinks kk aperta no link pô! não é virus relaxa<p>
                <a href="https://nextfitt.vercel.app/password/${email}/${token}">CLIQUE AQUI PARA RECUPERAR SUA SENHA</a>
                <p>Se você não solicitou a recuperação de senha, ignore este e-mail. Algum salafrario ta tentando ter acesso a sua conta mas relaxa que o site do pai é seguro! #confia</p>
        `

    }).then(
      async () => {
        await prisma.user.update({
          where: { email },
          data: {
            passwordResetToken: token,
            passwordResetExpires: dateNow
          }
        })

        return res.status(204).send(status200('Link de alteração de senha enviado ao email!'))
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

// RESET PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const passwordResetToken: string = req.body.resetToken || req.body.body.resetToken
    const password: string = req.body.password || req.body.body.password
    const email: string = req.body.email || req.body.body.email

    if (password.length < 6 || password.length > 16) {
      return res.status(400).send(status400('A senha deve contar mais de 6 caracteres e no máximo 16!'))
    }

    // VERIFY USER
    const userData: User | null = await prisma.user.findFirst({ where: { email } })

    if (!userData) {
      return res.status(400).send(status400('Usuário não existe!'))
    }

    if (passwordResetToken !== userData?.passwordResetToken) {
      return res.status(400).send(status400('Token de senha invalido!'))
    }

    if (dateNow > userData.passwordResetExpires) {
      return res.status(400).send(status400('Token expirou, solicite novamente!'))
    }

    // TOKEN RESET PASSWORD
    const token: string = randomBytes(20).toString('hex')

    // HASH PASSWORD
    const hashedPassword: string = await hash(password, 10)

    // UPADTE PASSWORD
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        passwordResetToken: token
      }

      // RETURN
    }).then(
      () => {
        return res.status(204).send(status200('Senha atualizada com sucesso!'))
      }

      // ERROR
    ).catch(
      (error) => {
        return res.status(500).send(status500(error))
      }
    )

    // ERROR
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
