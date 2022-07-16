import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status200, status500 } from '../response/status'

const prisma = new PrismaClient()

// FIND EXERCISES
export const findExercises = async (req: Request, res: Response) => {
  try {
    // SEARCH USERS
    const muscles = await prisma.muscles.findMany()
    // SEARCH USERS
    const exercises = await prisma.exercises.findMany()

    // RETURN
    status200('Pesquisa realizada!')
    res.status(200).send(exercises.map(
      (exercise) => {
        return ({
          id: exercise.id,
          muscle: muscles.find((muscle) => muscle.id === exercise.muscleId)?.name,
          members: muscles.find((muscle) => muscle.id === exercise.muscleId)?.members,
          name: exercise.name,
          img: exercise.img
        })
      }
    ))

    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

// FIND ONLY EXERCISES
export const findOnlyExercises = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idExercises: string = req.params.id

    // SEARCH USERS
    const exercises = await prisma.exercises.findUnique({
      where: { id: idExercises }
    })

    // RETURN
    status200('Pesquisa realizada!')
    res.status(200).send(exercises)

    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
