import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status200, status500 } from '../response/status'

const prisma = new PrismaClient()

// DELETE EXERCISES
export const deleteExercises = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idExercises: string = req.params.id

    // SEARCH USERS
    await prisma.exercises.delete({
      where: { id: idExercises }
    })

    // RETURN
    res.status(204).send()
    status200('Exercício excluído com sucesso!')
    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
