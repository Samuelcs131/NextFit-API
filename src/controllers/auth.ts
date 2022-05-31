import { Request, Response } from 'express'
import { PrismaClient, User } from '@prisma/client'
import clc from 'cli-color'
import { compare } from 'bcrypt'

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
        console.log(clc.bgRed('Erro: Preencha todos os campos!'))
        return res.status(400).send('Erro: Preencha todos os campos!')
      }
    }
    // eslint-disable-next-line
    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null) {
      console.log(clc.bgRed('Erro: Email invalido!'))
      return res.status(400).send('Email invalido!')
    }

    // SEARCH USERS
    const userData: User | null = await prisma.user.findUnique({
      where: { email: String(email) }
    })

    if (userData === null || userData === undefined) {
      console.log(clc.bgRed('Erro: Email não encontrado!'))
      return res.status(400).send('Erro: Email não encontrado!')
    }

    // COMPARE
    const comparePassword = await compare(password, userData?.password)
    if (comparePassword === true) {
      // RETURN
      console.log(clc.blue('[Usuário autenticado!]'))
      res.status(200).send({ menssage: 'Usuário autenticado!', auth: true })
    } else {
      // RETURN
      console.log(clc.bgRed('[Senha incorreta!]'))
      res.status(200).send({ menssage: 'Usuário não autenticado!', auth: false })
    }

    // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    res.status(400).send({ status: error })
  }
}

export default auth
