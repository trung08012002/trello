import jwt from 'jsonwebtoken'
import AppError from './appError'

async function verifyTokenHelper(token: string, tokenSecret: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, (err, payload) => {
      if (err) {
        return reject(new AppError(err.message, 401))
      }
      resolve(payload)
    })
  })
}

export default verifyTokenHelper
