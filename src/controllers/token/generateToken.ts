import secret from '@config/secret'
import { sign } from 'jsonwebtoken'

export const generateTokenUser = async (idUser: string) => {
  return sign({ id: idUser }, secret, { expiresIn: 86400 })
}
