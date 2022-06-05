import secret from '@config/secret'
import { sign } from 'jsonwebtoken'

const generateToken = async (idUser: string) => {
  /* console.log(sign({ id: idUser }, secret, { expiresIn: 86400 })) */
  return sign({ id: idUser }, secret, { expiresIn: 86400 })
}

export default generateToken
