import e from 'express'

interface RegisterReqBody {
  email: string
  password: string
  confirmPassword: string
  role: string
}
interface LoginRegisterReqBody {
  email: string
  password: string
}

export { RegisterReqBody, LoginRegisterReqBody }
