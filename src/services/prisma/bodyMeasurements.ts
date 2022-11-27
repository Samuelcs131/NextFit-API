import { BodyMeasurements, Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { handleApiError, handleApiResult } from '@services/handleApi'
import { IApiResponse } from 'src/@types/service/IApiResponse.type'

const { bodyMeasurements } = new PrismaClient()

export async function update (args: Prisma.BodyMeasurementsUpdateArgs): Promise<IApiResponse<BodyMeasurements>> {
  try {
    const exercisesPromisse = await bodyMeasurements.update(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function create (args: Prisma.BodyMeasurementsCreateArgs): Promise<IApiResponse<BodyMeasurements>> {
  try {
    const exercisesPromisse = await bodyMeasurements.create(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findMany (args?: Prisma.BodyMeasurementsFindManyArgs): Promise<IApiResponse<BodyMeasurements[]>> {
  try {
    const exercisesPromisse = await bodyMeasurements.findMany(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findUnique (args: Prisma.BodyMeasurementsFindUniqueArgs): Promise<IApiResponse<BodyMeasurements | null>> {
  try {
    const exercisesPromisse = await bodyMeasurements.findUnique(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function exclude (args: Prisma.BodyMeasurementsDeleteArgs): Promise<IApiResponse<BodyMeasurements>> {
  try {
    const exercisesPromisse = await bodyMeasurements.delete(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function deleteMany (args: Prisma.BodyMeasurementsDeleteManyArgs): Promise<IApiResponse<Prisma.BatchPayload>> {
  try {
    const exercisesPromisse = await bodyMeasurements.deleteMany(args)

    return handleApiResult(exercisesPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}
