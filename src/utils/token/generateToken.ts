import secret from '@config/secret'
import { sign } from 'jsonwebtoken'

export const generateTokenUser = async (userId: string) => {
  return sign({ id: userId }, secret, { expiresIn: 86400 })
}
