import { Muscles, Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { handleApiError, handleApiResult } from '@services/handleApi'
import { IApiResponse } from 'src/@types/api/IApiResponse.type'

const { muscles } = new PrismaClient()

export async function update (args: Prisma.MusclesUpdateArgs): Promise<IApiResponse<Muscles>> {
  try {
    const musclesPromisse = await muscles.update(args)

    return handleApiResult(musclesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function create (args: Prisma.MusclesCreateArgs): Promise<IApiResponse<Muscles>> {
  try {
    const musclesPromisse = await muscles.create(args)

    return handleApiResult(musclesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findMany (args?: Prisma.MusclesFindManyArgs): Promise<IApiResponse<Muscles[]>> {
  try {
    const musclesPromisse = await muscles.findMany(args)

    return handleApiResult(musclesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findUnique (args: Prisma.MusclesFindUniqueArgs): Promise<IApiResponse<Muscles | null>> {
  try {
    const musclesPromisse = await muscles.findUnique(args)

    return handleApiResult(musclesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findFirst (args: Prisma.MusclesFindFirstArgs): Promise<IApiResponse<Muscles | null>> {
  try {
    const musclesPromisse = await muscles.findFirst(args)

    return handleApiResult(musclesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function exclude (args: Prisma.MusclesDeleteArgs): Promise<IApiResponse<Muscles>> {
  try {
    const musclesPromisse = await muscles.delete(args)

    return handleApiResult(musclesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}
