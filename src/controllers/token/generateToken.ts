import secret from '@config/secret'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'

export const generateTokenUser = async (idUser: string) => {
  return sign({ id: idUser }, secret, { expiresIn: 86400 })
}

export const varifyApiKey = async (hash: string) => {
  const apiKey: string = process.env.NEXTFIT_API_KEY as string
  return compare(apiKey, hash)
}
