import { Request, Response } from 'express'
import { Exercises, PrismaClient } from '@prisma/client'
import { status200, status400, status500 } from '@controllers/response/status'

const prisma = new PrismaClient()

// UPDATE EXERCISES
export const updateExercises = async (req: Request, res: Response) => {
  try {
    const { name, muscleId, img }: Exercises = req.body.body || req.body
    const exercisesId: string = req.params.id
    const inputs = [name, img, muscleId, exercisesId]

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        return res.status(400).send(status400('Preencha todos os campos!'))
      }
    }

    try {
      const muscles = await prisma.exercises.update({
        where: { id: exercisesId },
        data: {
          name: String(name).trim(),
          muscleId: String(muscleId).trim(),
          img: String(img).trim()
        }
      })
      res.status(200).send(muscles)
      status200('Exercício atualizado com sucesso!')
    } catch (error) {
      res.status(400).send(status400('Músculo inexistente ou músculo já cadastrado!'))
    }
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
