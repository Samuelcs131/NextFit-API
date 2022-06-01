import { Request, Response } from 'express'
import { PrismaClient, User } from '@prisma/client'
import { iUser } from 'src/@types/endpoints'
import clc from 'cli-color'
import { hash } from 'bcrypt'
import { status200, status400, status500 } from './response/status'

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
    console.log(clc.blue('[Pesquisa realizada!]'))
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
    const user: User | null = await prisma.user.findUnique({
      where: { id: idUser }
    })

    if (user === undefined || user === null) {
      return res.status(400).send(status400('O ID fornecido é invalido!'))
    }

    // RETURN
    status200('[Pesquisa realizada!]')
    res.status(200).send({
      id: user?.id,
      name: user?.name,
      lastName: user?.lastName,
      email: user?.email,
      height: user?.height
    })

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
        console.log(clc.bgRed('Erro: Preencha todos os campos!'))
        return res.status(400).send(status400('Preencha todos os campos!'))
      }
    }

    if (password.length < 6 || password.length > 16) {
      console.log(clc.bgRed('Erro: A senha deve contar mais de 6 caracteres e no máximo 16!'))
      return res.status(400).send(status400('A senha deve contar mais de 6 caracteres e no máximo 16!'))
    }

    if ((/\s/g).test(password) === true) {
      console.log(clc.bgRed('Erro: A senha não pode haver espaços!'))
      return res.status(400).send(status400('A senha não pode haver espaços!'))
    }

    // eslint-disable-next-line
    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null) {
      console.log(clc.bgRed('Erro: Email invalido!'))
      return res.status(400).send(status400('Email invalido!'))
    }

    // VERIFY EMAIL
    const searchEmailUser = await prisma.user.findMany({ where: { email } })

    if (searchEmailUser.length !== 0) {
      console.log(clc.bgRed('Erro: Email já cadastrado!'))
      return res.status(400).send(status400('Email já cadastrado!'))
    }

    // HASH PASSWORD
    const hashedPassword: string = await hash(password, 10)

    // REGISTER USER
    const user = await prisma.user.create({
      data: {
        name: String(name).trim(),
        lastName: String(lastName).trim(),
        email: String(email).trim(),
        height: Number(height),
        password: hashedPassword
      }
    })

    // RETURN
    console.log(clc.green('[Usuário Cadastrado!]'))
    return res.status(200).send({ user })

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
    const height: number = Number(req.body.height)

    // UPADTE USER
    await prisma.user.update({
      where: { id: idUser },
      data: { name, lastName, email, height }
    })

    // RETURN
    console.log(clc.green('Usuário atualizado!'))
    res.status(200).send('Usuário atualizado!')

  // ERROR!
  } catch (error) {
    return res.status(500).send(status500(error))
  }
}

// DELETE
export const exclude = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idUser: string = String(req.params.id)

    // DELETE USER
    await prisma.user.delete({
      where: { id: idUser }
    })

    // RETURN
    console.log(clc.green('Usuário excluido!'))
    res.status(200).send('Usuário excluido!')
  // ERROR!
  } catch (error) {
    return res.status(500).send(status500(error))
  }
}
