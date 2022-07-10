import { Request, Response } from 'express'
import { Exercises, PrismaClient } from '@prisma/client'
import { status200, status400, status500 } from '@controllers/response/status'

const prisma = new PrismaClient()

// CREATE EXERCISES
export const createExercises = async (req: Request, res: Response) => {
  try {
    const { name, img, muscleId }: Exercises = req.body.body || req.body
    const inputs = [name, img, muscleId]

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        return res.status(400).send(status400('Preencha todos os campos!'))
      }
    }

    try {
      const muscles = await prisma.exercises.create({
        data: {
          name: String(name).trim(),
          img: String(img).trim(),
          muscleId: String(muscleId).trim()
        }
      })
      res.status(200).send(muscles)
      status200('Exercício cadastrado com sucesso!')
    } catch (error) {
      res.status(400).send(status400('Exercício inexistente ou Exercício já cadastrado!'))
    }
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
