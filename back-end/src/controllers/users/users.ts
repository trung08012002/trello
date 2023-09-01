import { Response, Request, NextFunction } from 'express'
import usersService from '~/services/usersService'
import { catchAsync } from '~/utils/catchAsync'
import { ParamsDictionary } from 'express-serve-static-core'
import { LoginRegisterReqBody, RegisterReqBody } from '~/models/requests/User.request'
import { ObjectId } from 'mongodb'
import AppError from '~/utils/appError'

import jwt, { JwtPayload } from 'jsonwebtoken'
import verifyTokenHelper from '~/utils/verifyToken'
import { HTTP_STATUS, USERS_MESSAGES } from '~/constants/enum'
import databaseService from '~/services/database.services'
import User from '~/models/schemas/User.schema'
const loginController = catchAsync(async (req: Request, res: Response) => {
  const { user } = req
  const user_id = user?._id as ObjectId

  const result = await usersService.login(user_id)
  console.log(result)
  res.cookie('jwt', result.accessToken, { sameSite: 'none', secure: true, httpOnly: true })

  res.status(200).json({
    ...result,
    user_id,
    email: user!.email,
    name: user?.name,
    day_of_birth: user?.day_of_birth,
    verify: user?.verify,
    role: user?.role
  })
})
const registerController = catchAsync(async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await usersService.signup(req.body)
  const optionsCookie = {
    secure: process.env.NODE_ENV === 'Production' ? true : false,
    httpOnly: true
  }
  res.cookie('jwt', result.accessToken, optionsCookie)
  res.status(201).json(result)
})

const refreshTokenController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const refreshTokenBody = req.body.refreshToken
  if (!refreshTokenBody) next(new AppError(USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED, 401))
  const payload = await verifyTokenHelper(refreshTokenBody, process.env.REFRESH_TOKEN_SECRET as string)
  const { _id, iat } = payload as jwt.JwtPayload
  console.log(payload)
  const { accessToken, refreshToken } = await usersService.createToken(_id)
  const optionsCookie = {
    secure: process.env.NODE_ENV === 'Production' ? true : false,
    httpOnly: true
  }
  res.cookie('jwt', accessToken, optionsCookie)
  res.status(201).json({ accessToken, refreshToken, _id })
})

const logoutController = catchAsync(async (req: Request, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  res.clearCookie('jwt')
  res.status(200).json({ message: 'logout successful' })
})

const emailVerifyTokenController = catchAsync(async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id } = req.decoded_email_verify_token as JwtPayload
  const user = await databaseService.users.findOne(new ObjectId(user_id))
  if (!user) new AppError(USERS_MESSAGES.USER_IS_NOT_EXISTED, HTTP_STATUS.NOT_FOUND)
  if (user?.email_verify_token === '') {
    res.json({ message: USERS_MESSAGES.USER_HAS_ALREADY_VERIFIED })
  }
  const { access_token, refresh_token } = await usersService.verifyEmail(user_id!)
  res.cookie('jwt', access_token)
  res.status(200).send({ message: USERS_MESSAGES.VERIFY_EMAIL_SUCCESS, access_token, refresh_token })
})
const resendEmail = catchAsync(async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const user = req.user
  if (user?.email_verify_token === '') {
    res.json({ message: USERS_MESSAGES.USER_HAS_ALREADY_VERIFIED })
  }
  const message = await usersService.resendEmailVerified(user!._id!)
  res.json({ message })
})

const forgotPasswordController = catchAsync(async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { _id } = req.user as User
  const message = await usersService.forgotPassword(_id!)
  res.json({ message })
})
export default {
  loginController,
  registerController,
  refreshTokenController,
  logoutController,
  emailVerifyTokenController,
  resendEmail,
  forgotPasswordController
}
