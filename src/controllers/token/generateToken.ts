import secret from '@config/secret'
import { sign } from 'jsonwebtoken'

const generateToken = async (idUser: string) => {
  return sign({ id: idUser }, secret, { expiresIn: 3600 })
}

export default generateToken
