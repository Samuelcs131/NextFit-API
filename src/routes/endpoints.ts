import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { iGetParams } from 'src/@types/endpoints'
import clc from 'cli-color'
import { hash } from 'bcrypt'

const router = express.Router()
const prisma = new PrismaClient()

// GET
router.get('/user', async (req: Request, res: Response) => {
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
})

// POST
router.post('/user', async (req, res) => {
  try {
    // PARAMS
    const { name, lastName, email, password }: iGetParams = req.body
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
})

// PUT
router.put('/user', (req, res) => {
  res.send('alguma coisa')
})

// DELETE
router.delete('/user', (req, res) => {
  res.send('alguma coisa')
})

export default router
