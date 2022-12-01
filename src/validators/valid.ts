import { env } from '@config/envVariables'
import { compare } from 'bcrypt'
import { UserSex } from 'src/models/users/enums/UserSex.enum'
import { UserType } from 'src/models/users/enums/UserType.enum'

export function verifyString<T> (stringFields: Array<T>) {
  for (let num = 0; num < stringFields.length; num++) {
    if (
      stringFields[num] === null ||
      stringFields[num] === undefined ||
      typeof stringFields[num] !== 'string' ||
      (stringFields[num] as string).trim() === ''
    ) {
      return true
    }
  }

  return false
}

export function verifyNumber<T> (numberFields: Array<T>) {
  for (let num = 0; num < numberFields.length; num++) {
    if (
      numberFields[num] === null ||
      numberFields[num] === undefined ||
      typeof numberFields[num] !== 'number'
    ) {
      return true
    }
  }

  return false
}

export function verifyArray<T> (arrayFields: Array<T>, type: string) {
  if (Array.isArray(arrayFields) === false) return true

  switch (type) {
    case 'string':
      for (let num = 0; num < arrayFields.length; num++) {
        if (typeof arrayFields[num] !== 'string') {
          return true
        }
      }
      break

    case 'number':
      for (let num = 0; num < arrayFields.length; num++) {
        if (typeof arrayFields[num] !== 'number') {
          return true
        }
      }
      break

    default:
  }

  return false
}

export function verifyEmail (email: string) {
  // eslint-disable-next-line
  const regexEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (
    email.match(regexEmail)
  ) {
    return false
  } else {
    return true
  }
}

export async function verifyApiKey (hash: string) {
  const apiKey: Array<string> = env().authorization || []

  for (let num = 0; apiKey.length > num; num++) {
    if (await compare(apiKey[num], hash)) {
      return true
    }
  }

  return false
}

export function verifyUserSex (fieldSex: number) {
  switch (fieldSex) {
    case UserSex.female:
      return false
    case UserSex.male:
      return false
    default:
      return true
  }
}

export function verifyPassword (fieldPassword: string) {
  if (
    fieldPassword.length < 8 ||
    fieldPassword.length > 32 ||
    (/\s/g).test(fieldPassword) === true
  ) {
    return true
  }
  return false
}

export function verifyUserType (fieldUserType: number) {
  switch (fieldUserType) {
    case UserType.user:
      return false
    case UserType.admin:
      return false
    default:
      return true
  }
}
