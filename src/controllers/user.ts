import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { iUser } from 'src/@types/endpoints'
import clc from 'cli-color'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

// GET
export const index = async (req: Request, res: Response) => {
  try {
    // SEARCH USERS
    const users = await prisma.user.findMany()

    // RETURN
    console.log(clc.blue('[Pesquisa realizada!]'))
    res.status(200).send({ users })

    // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    res.status(400).send({ status: error })
  }
}

// POST
export const create = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const { name, lastName, email, password }: iUser = req.body
    const height: number = Number(req.body.height)

    // VERYFY EMAIL
    const searchEmailUser = await prisma.user.findMany({ where: { email } })

    if (searchEmailUser.length !== 0) {
      console.log(clc.bgRed('Erro: Email já cadastrado!'))
      return res.status(200).send({ error: 'Email já cadastrado!' })
    }

    // HASH PASSWORD
    const hashedPassword: string = await hash(password, 10)

    // REGISTER USER
    const user = await prisma.user.create({
      data: { name, lastName, email, height, password: hashedPassword }
    })

    // RETURN
    console.log(clc.green('[Usuário Cadastrado!]'))
    return res.status(200).send({ user })

  // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    return res.status(400).json({ status: error })
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
    console.log(clc.bgRed('Erro:'), error)
    return res.status(400).json({ status: error })
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
    console.log(clc.bgRed('Erro:'), error)
    return res.status(400).json({ status: error })
  }
}
