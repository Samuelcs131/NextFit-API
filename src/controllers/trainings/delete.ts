import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status200, status500 } from '../response/status'

const prisma = new PrismaClient()

// DELETE TRAINING
export const deleteTraining = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const trainingId: string = req.params.id

    // REGISTER TRAINING
    await prisma.training.delete({
      where: { id: trainingId }
    })

    // RETURN
    status200('Treino excluido!')
    return res.status(204).send('Treino excluido!')

    // ERROR!
  } catch (error) {
    return res.status(500).send(status500(error))
  }
}
