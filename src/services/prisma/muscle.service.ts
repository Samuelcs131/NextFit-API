import { Muscle, Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { handleApiError, handleApiResult } from '@services/handleApi'
import { IApiResponse } from 'src/types/api/IApiResponse'

const { muscle } = new PrismaClient()

export async function update (args: Prisma.MuscleUpdateArgs): Promise<IApiResponse<Muscle>> {
  try {
    const musclePromisse = await muscle.update(args)

    return handleApiResult(musclePromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function create (args: Prisma.MuscleCreateArgs): Promise<IApiResponse<Muscle>> {
  try {
    const musclePromisse = await muscle.create(args)

    return handleApiResult(musclePromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findMany (args?: Prisma.MuscleFindManyArgs): Promise<IApiResponse<Muscle[]>> {
  try {
    const musclesPromisse = await muscle.findMany(args)

    return handleApiResult(musclesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findUnique (args: Prisma.MuscleFindUniqueArgs): Promise<IApiResponse<Muscle | null>> {
  try {
    const musclePromisse = await muscle.findUnique(args)

    return handleApiResult(musclePromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findFirst (args: Prisma.MuscleFindFirstArgs): Promise<IApiResponse<Muscle | null>> {
  try {
    const musclePromisse = await muscle.findFirst(args)

    return handleApiResult(musclePromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function exclude (args: Prisma.MuscleDeleteArgs): Promise<IApiResponse<Muscle>> {
  try {
    const musclePromisse = await muscle.delete(args)

    return handleApiResult(musclePromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}
