import { Exercise, Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { handleApiError, handleApiResult } from '@services/handleApi'
import { IApiResponse } from 'src/types/api/IApiResponse'

const { exercise } = new PrismaClient()

export async function update (args: Prisma.ExerciseUpdateArgs): Promise<IApiResponse<Exercise>> {
  try {
    const exercisePromisse = await exercise.update(args)

    return handleApiResult(exercisePromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function create (args: Prisma.ExerciseCreateArgs): Promise<IApiResponse<Exercise>> {
  try {
    const exercisePromisse = await exercise.create(args)

    return handleApiResult(exercisePromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findMany (args?: Prisma.ExerciseFindManyArgs): Promise<IApiResponse<Exercise[]>> {
  try {
    const exercisesPromisse = await exercise.findMany(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findUnique (args: Prisma.ExerciseFindUniqueArgs): Promise<IApiResponse<Exercise | null>> {
  try {
    const exercisePromisse = await exercise.findUnique(args)

    return handleApiResult(exercisePromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function exclude (args: Prisma.ExerciseDeleteArgs): Promise<IApiResponse<Exercise>> {
  try {
    const exercisePromisse = await exercise.delete(args)

    return handleApiResult(exercisePromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}
