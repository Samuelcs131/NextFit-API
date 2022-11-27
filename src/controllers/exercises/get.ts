import { Request, Response } from 'express'
import { statusCode } from '@utils/status'
import * as ExercisesService from '@services/prisma/exercises.service'
import * as MusclesService from '@services/prisma/muscles.service'

export const getAllExercises = async (req: Request, res: Response) => {
  const musclesPromisse = MusclesService.findMany()
  const exercisesPromisse = ExercisesService.findMany()

  const [musclesResolved, exercisesResolved] =
  await Promise.all([musclesPromisse, exercisesPromisse])

  const [musclesError, muscles] = musclesResolved
  const [exercisesError, exercises] = exercisesResolved

  if (exercisesError || musclesError) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  const exercicesFormated = exercises.map(
    (exercise) => {
      return ({
        id: exercise.id,
        muscle: muscles.find((muscle) => muscle.id === exercise.muscleId)?.name,
        members: muscles.find((muscle) => muscle.id === exercise.muscleId)?.members,
        name: exercise.name,
        img: exercise.img
      })
    }
  )

  res.status(200).send(exercicesFormated)
}

export const getExercisesById = async (req: Request, res: Response) => {
  const idExercises: string = req.params.id

  const args = {
    where: { id: idExercises }
  }

  const [error, exercises] = await ExercisesService.findUnique(args)

  if (error) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  res.status(200).send(exercises)
}
