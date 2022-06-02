import { Request, Response } from 'express'
import { PrismaClient, User } from '@prisma/client'
import { compare } from 'bcrypt'
import { status200, status400, status500 } from './response/status'

const prisma = new PrismaClient()

// POST
const auth = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const email: string = req.body.email
    const password: string = req.body.password
    const inputs = [email, password]

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        return res.status(400).send(status400('Preencha todos os campos!'))
      }
    }
    // eslint-disable-next-line
    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null) {
      return res.status(400).send(status400('Email invalido!'))
    }

    // SEARCH USERS
    const userData: User | null = await prisma.user.findUnique({
      where: { email: String(email) }
    })

    if (userData === null || userData === undefined) {
      return res.status(400).send(status400('Email não encontrado!'))
    }

    // COMPARE
    const comparePassword = await compare(password, userData?.password)
    if (comparePassword === true) {
      // RETURN
      status200('Usuário autenticado!')
      res.status(200).send({ menssage: 'Usuário autenticado!', auth: true })
    } else {
      // RETURN
      status400('Senha não autenticado!')
      res.status(200).send({ menssage: 'Usuário não autenticado!', auth: false })
    }

    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

export default auth
