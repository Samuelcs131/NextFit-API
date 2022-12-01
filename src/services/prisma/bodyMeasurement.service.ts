import { BodyMeasurement, Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { handleApiError, handleApiResult } from '@services/handleApi'
import { IApiResponse } from 'src/types/api/IApiResponse'

const { bodyMeasurement } = new PrismaClient()

export async function update (args: Prisma.BodyMeasurementUpdateArgs): Promise<IApiResponse<BodyMeasurement>> {
  try {
    const exercisesPromisse = await bodyMeasurement.update(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function create (args: Prisma.BodyMeasurementCreateArgs): Promise<IApiResponse<BodyMeasurement>> {
  try {
    const exercisesPromisse = await bodyMeasurement.create(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findMany (args?: Prisma.BodyMeasurementFindManyArgs): Promise<IApiResponse<BodyMeasurement[]>> {
  try {
    const exercisesPromisse = await bodyMeasurement.findMany(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findUnique (args: Prisma.BodyMeasurementFindUniqueArgs): Promise<IApiResponse<BodyMeasurement | null>> {
  try {
    const exercisesPromisse = await bodyMeasurement.findUnique(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function exclude (args: Prisma.BodyMeasurementDeleteArgs): Promise<IApiResponse<BodyMeasurement>> {
  try {
    const exercisesPromisse = await bodyMeasurement.delete(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function deleteMany (args: Prisma.BodyMeasurementDeleteManyArgs): Promise<IApiResponse<Prisma.BatchPayload>> {
  try {
    const exercisesPromisse = await bodyMeasurement.deleteMany(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}
