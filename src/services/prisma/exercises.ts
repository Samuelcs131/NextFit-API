import { Exercises, Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { handleApiError, handleApiResult } from '@services/handleApi'
import { IApiResponse } from '@types/api/IApiResponse.type'

const { exercises } = new PrismaClient()

export async function update (args: Prisma.ExercisesUpdateArgs): Promise<IApiResponse<Exercises>> {
  try {
    const exercisesPromisse = await exercises.update(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function create (args: Prisma.ExercisesCreateArgs): Promise<IApiResponse<Exercises>> {
  try {
    const exercisesPromisse = await exercises.create(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findMany (args?: Prisma.ExercisesFindManyArgs): Promise<IApiResponse<Exercises[]>> {
  try {
    const exercisesPromisse = await exercises.findMany(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findUnique (args: Prisma.ExercisesFindUniqueArgs): Promise<IApiResponse<Exercises | null>> {
  try {
    const exercisesPromisse = await exercises.findUnique(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function exclude (args: Prisma.ExercisesDeleteArgs): Promise<IApiResponse<Exercises>> {
  try {
    const exercisesPromisse = await exercises.delete(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}
