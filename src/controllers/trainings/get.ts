import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status200, status400, status500 } from '../response/status'

const prisma = new PrismaClient()

// FIND TRAININGS
export const findTrainings = async (req: Request, res: Response) => {
  try {
    // SEARCH USERS
    const training = await prisma.training.findMany()

    // RETURN
    status200('Pesquisa realizada!')
    res.status(200).send(training)

    // ERROR!
  } catch (error) {
    return res.status(400).send(status500(error))
  }
}

// FIND ONLY TRAINING BY ID
export const findOnlyTrainingById = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idTreining: string = String(req.params.id)

    try {
      // SEARCH USERS
      const training = await prisma.training.findUnique({
        where: { id: idTreining }
      })

      // RETURN
      status200('Pesquisa realizada!')
      res.status(200).send(training)

      // ERROR!
    } catch (error) {
      console.log(error)
      return res.status(400).send(status400('O ID fornecido é invalido!'))
    }

    // ERROR!
  } catch (error) {
    return res.status(400).send(status500(error))
  }
}

// FIND TRAININGS BY ID USER
export const findTrainingsByIdUser = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idUser: string = String(req.params.id)

    try {
      // SEARCH USERS
      const trainings = await prisma.training.findMany({
        where: { userId: idUser }
      })
      const exercises = await prisma.exercises.findMany()

      const muscles = await prisma.muscles.findMany()

      // RETURN
      status200('Pesquisa realizada!')
      res.status(200).send(trainings.map((training) => {
        return ({
          id: training.id,
          exercise: exercises.find((exercise) => exercise.id === training.exercisesId)?.name,
          muscle: muscles.find((muscle) => muscle.id === exercises.find((exercise) => exercise.id === training.exercisesId)?.muscleId)?.name,
          date: training.date,
          series: training.series,
          repetitions: training.repetitions,
          weight: training.weight,
          interval: training.interval,
          createAt: training.createAt
        })
      }))

      // ERROR!
    } catch (error) {
      return res.status(400).send(status400('O ID fornecido é invalido!'))
    }

    // ERROR!
  } catch (error) {
    return res.status(400).send(status500(error))
  }
}
