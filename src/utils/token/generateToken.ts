import { env } from '@config/envVariables'
import { sign } from 'jsonwebtoken'

export const generateTokenUser = async (userId: string) => {
  return sign({ id: userId }, env().secret, { expiresIn: 86400 })
}
