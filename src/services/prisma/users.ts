import { User, Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { handleApiError, handleApiResult } from '@services/handleApi'
import { IApiResponse } from 'src/@types/api/IApiResponse.type'

const { user } = new PrismaClient()

export async function update (args: Prisma.UserUpdateArgs): Promise<IApiResponse<User>> {
  try {
    const trainingsPromisse = await user.update(args)

    return handleApiResult(trainingsPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function create (args: Prisma.UserCreateArgs): Promise<IApiResponse<User>> {
  try {
    const trainingsPromisse = await user.create(args)

    return handleApiResult(trainingsPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findMany (args?: Prisma.UserFindManyArgs): Promise<IApiResponse<User[]>> {
  try {
    const trainingsPromisse = await user.findMany(args)

    return handleApiResult(trainingsPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findUnique (args: Prisma.UserFindUniqueArgs): Promise<IApiResponse<User | null>> {
  try {
    const trainingsPromisse = await user.findUnique(args)

    return handleApiResult(trainingsPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function findFirst (args: Prisma.UserFindUniqueArgs): Promise<IApiResponse<User | null>> {
  try {
    const trainingsPromisse = await user.findFirst(args)

    return handleApiResult(trainingsPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}

export async function exclude (args: Prisma.UserDeleteArgs): Promise<IApiResponse<User>> {
  try {
    const trainingsPromisse = await user.delete(args)

    return handleApiResult(trainingsPromisse)
  } catch (error) {
    return handleApiError(error as Error & PrismaClientKnownRequestError)
  }
}
