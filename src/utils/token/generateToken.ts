import env from '@config/variables'
import { sign } from 'jsonwebtoken'

export const generateTokenUser = async (userId: string) => {
  return sign({ id: userId }, env.production.secret, { expiresIn: 86400 })
}
