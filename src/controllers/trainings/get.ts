import { Request, Response } from 'express'
import { statusCode } from 'src/utils/status'
import * as TrainingsService from '@services/prisma/trainings'
import * as ExercisesService from '@services/prisma/exercises'
import * as MusclesService from '@services/prisma/muscles'
import { Prisma } from '@prisma/client'
import { $date, reverseDateFormat } from 'src/utils/date/date-functions'
import { verifyString } from 'src/utils/verifications/valid'

export const getAllTrainings = async (req: Request, res: Response) => {
  const [error, training] = await TrainingsService.findMany()

  if (error) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  res.status(200).send(training)
}

export const getTrainingById = async (req: Request, res: Response) => {
  const trainingId: string = req.params.id

  const args = {
    where: { id: trainingId }
  }

  const trainingPromisse = TrainingsService.findUnique(args)
  const exercisesPromisse = ExercisesService.findMany()
  const musclesPromisse = MusclesService.findMany()

  const [trainingsResponse, exercisesResponse, musclesResponse] =
  await Promise.all([trainingPromisse, exercisesPromisse, musclesPromisse])

  const [trainingError, training] = trainingsResponse
  const [exercisesError, exercises] = exercisesResponse
  const [musclesError, muscles] = musclesResponse

  if (trainingError || exercisesError || musclesError) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  const formated = {
    id: training?.id,
    exercise: exercises.find((exercise) => exercise.id === training?.exercisesId)?.name,
    muscle: muscles.find((muscle) => muscle.id === exercises.find((exercise) => exercise.id === training?.exercisesId)?.muscleId)?.name,
    date: training?.date,
    series: training?.series,
    repetitions: training?.repetitions,
    weight: training?.weight,
    interval: training?.interval,
    createAt: training?.createAt
  }

  res.status(200).send(formated)
}

export const getAllTrainingsByIdUser = async (req: Request, res: Response) => {
  const userId: string = req.params.userId

  const args = {
    where: { userId }
  }
  const trainingsPromisse = TrainingsService.findMany(args)
  const exercisesPromisse = ExercisesService.findMany()
  const musclesPromisse = MusclesService.findMany()

  const [trainingsResponse, exercisesResponse, musclesResponse] =
      await Promise.all([trainingsPromisse, exercisesPromisse, musclesPromisse])

  const [trainingError, trainings] = trainingsResponse
  const [exercisesError, exercises] = exercisesResponse
  const [musclesError, muscles] = musclesResponse

  if (trainingError || exercisesError || musclesError) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

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
}

export const getTrainingsOfMonthByIdUser = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const date: string = $date(reverseDateFormat(req.params.date), true).format()
  const lastDayOfMonth: string = $date(reverseDateFormat(req.params.date), true).endOf('M').format()

  if (
    verifyString([userId]) ||
    !$date(date, true).isValid()
  ) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args: Prisma.TrainingFindManyArgs = {
    orderBy: {
      date: 'asc'
    },
    where: {
      userId,
      OR: [{
        date: { gte: date },
        AND: {
          date: { lte: lastDayOfMonth }
        }
      }]
    }
  }

  const trainingsPromisse = TrainingsService.findMany(args)
  const exercisesPromisse = ExercisesService.findMany()
  const musclesPromisse = MusclesService.findMany()

  const [trainingsResponse, exercisesResponse, musclesResponse] = await Promise.all([trainingsPromisse, exercisesPromisse, musclesPromisse])

  const [trainingError, trainings] = trainingsResponse
  const [exercisesError, exercises] = exercisesResponse
  const [musclesError, muscles] = musclesResponse

  if (trainingError || exercisesError || musclesError) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  const formated = trainings.map((training) => {
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
  })

  res.status(200).send(formated)
}

export const getTrainingsBetweenDatesByUserId = async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  const dateInitial: string = $date(reverseDateFormat(req.params.dateInitial), true).format()
  const dateFinal: string = $date(reverseDateFormat(req.params.dateFinal), true).format()

  if (
    verifyString([userId]) ||
    !$date(dateInitial, true).isValid() ||
    !$date(dateFinal, true).isValid()
  ) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args: Prisma.TrainingFindManyArgs = {
    orderBy: {
      date: 'asc'
    },
    where: {
      userId,
      OR: [{
        date: { gte: dateInitial },
        AND: {
          date: { lte: dateFinal }
        }
      }]
    }
  }

  const trainingsPromisse = TrainingsService.findMany(args)
  const exercisesPromisse = ExercisesService.findMany()
  const musclesPromisse = MusclesService.findMany()

  const [trainingsResponse, exercisesResponse, musclesResponse] = await Promise.all([trainingsPromisse, exercisesPromisse, musclesPromisse])

  const [trainingError, trainings] = trainingsResponse
  const [exercisesError, exercises] = exercisesResponse
  const [musclesError, muscles] = musclesResponse

  if (trainingError || exercisesError || musclesError) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  const formated = trainings.map((training) => {
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
  })

  res.status(200).send(formated)
}
