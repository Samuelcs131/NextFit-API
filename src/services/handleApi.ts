import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { IApiResponse } from 'src/types/api/IApiResponse.type'

function handleApiResult<T> (apiResponse: T): IApiResponse<T> {
  return [null, apiResponse]
}

function handleApiError (error: Error): [Error & PrismaClientKnownRequestError] {
  return [error as Error & PrismaClientKnownRequestError]
}

export { handleApiResult, handleApiError }
