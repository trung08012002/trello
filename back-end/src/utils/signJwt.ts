import jwt from 'jsonwebtoken'

export default function signToken({
  payload,
  privateKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey?: string
  options: jwt.SignOptions
}) {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey as string, options, (err, token) => {
      if (err) {
        throw reject(err)
      }
      resolve(token as string)
    })
  })
}
