import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status200, status400, status500 } from '../response/status'
/* eslint-disable-next-line */
import { generateTokenUser, varifyApiKey } from '../token/generateToken'

const prisma = new PrismaClient()

// DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
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
