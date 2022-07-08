import { Request, Response } from 'express'
import { PrismaClient, User } from '@prisma/client'
import { status200, status400, status500 } from '../response/status'
/* eslint-disable-next-line */
import { generateTokenUser, varifyApiKey } from '../token/generateToken'

const prisma = new PrismaClient()

// UPDATE USER
export const updateUser = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idUser: string = String(req.params.id)
    const { name, lastName, email, height }: User = req.body.body || req.body
    const inputs = [idUser, name, lastName, email, height]
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
          height: Number(height)
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
