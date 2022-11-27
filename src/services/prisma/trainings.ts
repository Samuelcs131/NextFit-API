import { Training, Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { handleApiError, handleApiResult } from '@services/handleApi'
import { IApiResponse } from '@types/api/IApiResponse.type'

const { training } = new PrismaClient()

export async function update (args: Prisma.TrainingUpdateArgs): Promise<IApiResponse<Training>> {
  try {
    const trainingsPromisse = await training.update(args)

    return handleApiResult(trainingsPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function create (args: Prisma.TrainingCreateArgs): Promise<IApiResponse<Training>> {
  try {
    const trainingsPromisse = await training.create(args)

    return handleApiResult(trainingsPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findMany (args?: Prisma.TrainingFindManyArgs): Promise<IApiResponse<Training[]>> {
  try {
    const trainingsPromisse = await training.findMany(args)

    return handleApiResult(trainingsPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findUnique (args: Prisma.TrainingFindUniqueArgs): Promise<IApiResponse<Training | null>> {
  try {
    const trainingsPromisse = await training.findUnique(args)

    return handleApiResult(trainingsPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function exclude (args: Prisma.TrainingDeleteArgs): Promise<IApiResponse<Training>> {
  try {
    const trainingsPromisse = await training.delete(args)

    return handleApiResult(trainingsPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function deleteMany (args: Prisma.TrainingDeleteManyArgs): Promise<IApiResponse<Prisma.BatchPayload>> {
  try {
    const trainingsPromisse = await training.deleteMany(args)

    return handleApiResult(trainingsPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}
