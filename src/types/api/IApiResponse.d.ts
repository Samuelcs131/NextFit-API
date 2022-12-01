import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

export type IApiResponse<T> = [null, T] | [Error & PrismaClientKnownRequestError]
