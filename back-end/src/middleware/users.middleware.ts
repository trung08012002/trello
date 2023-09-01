import { body, checkSchema } from 'express-validator'
import databaseService from '~/services/database.services'
import usersService from '~/services/usersService'
import hash from '~/utils/hash'
import validate from '~/utils/validate'
import bcrypt from 'bcrypt'
import { NextFunction } from 'express'
import jwt, { JsonWebTokenError, Jwt, JwtPayload } from 'jsonwebtoken'

import { Request, Response } from 'express'
import AppError from '~/utils/appError'
import changedPasswordAfter from '~/utils/changePasswordAfter'
import { ObjectId } from 'mongodb'
import { catchAsync } from '~/utils/catchAsync'
import { HTTP_STATUS, USERS_MESSAGES } from '~/constants/enum'
import verifyTokenHelper from '~/utils/verifyToken'
import { STATUS_CODES } from 'http'
const registerValidator = validate(
  checkSchema({
    email: {
      isEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const isEmailExit = await usersService.checkEmailExist(value)
          if (isEmailExit) {
            throw new Error('Email already exists')
          }
          return isEmailExit
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: { min: 8 }
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1
        }
      },
      errorMessage: { error: 'Password has to have at least 1 uppercase, lowercase, symbol and at least 8 characters' }
    },
    confirmPassword: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: { min: 8 }
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1
        }
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirm does not match password')
          } else {
            return true
          }
        }
      }
    }

    // date_of_birth: {
    //   isISO8601: {
    //     options: {
    //       strict: true,
    //       strictSeparator: true
    //     }
    //   }
    // }
  })
)

const correctPassword = async (candidatePasswords: string, userPassword: string) => {
  return await bcrypt.compare(candidatePasswords, userPassword)
}

const accessTokenValidator = validate(
  checkSchema({
    Authorization: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
      },
      custom: {}
    }
  })
)

const loginValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: true,
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({ email: value })
            if (!user) {
              throw new Error('Email not existed')
            }
            const passwordCorrect = await correctPassword(req.body.password, user.password)
            if (!passwordCorrect) {
              throw new Error('Password incorrect')
            }
            req.user = user
            return true
          }
        }
      },
      password: {
        notEmpty: true,
        isString: true,
        isLength: {
          options: { min: 8 }
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
          }
        },
        errorMessage: {
          error: 'Password has to have at least 1 uppercase, lowercase, symbol and at least 8 characters'
        }
      }
    },
    ['body']
  )
)

const protectRoute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // req.headers.authorization
  const authHeader = req.cookies['jwt']

  //get token from auth header
  // if (!authHeader) {
  //   return next(new AppError('You are not logged in ! Please login to access', 401))
  // }
  // console.log('auth header', authHeader)
  // const bearerToken = authHeader.split('=')
  // const token = bearerToken[1]
  const token = authHeader
  const payload = await verifyTokenHelper(token, process.env.ACCESS_TOKEN_SECRET as string)
  //verify token
  const { user_id, iat } = payload as jwt.JwtPayload

  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

  if (!user) {
    return next(new AppError('User not found', 404))
  }
  /// check user changed password
  const isChangePasswordAfter = changedPasswordAfter(iat, user.password_changed_at)
  if (isChangePasswordAfter) {
    return next(new AppError('Your password has changed after you logged in', 401))
  }
  req.user = user
  next()
})

const retrictTo = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      return next(new AppError("User don't have permissions to perform this action", 403))
    }
    next()
  }
}

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        custom: {
          options: async (value: string, { req }) => {
            try {
              if (value === undefined) {
                throw new AppError(USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED, HTTP_STATUS.UNAUTHORIZED)
              }
              const [_, refresh_token] = await Promise.all([
                verifyTokenHelper(value, process.env.REFRESH_TOKEN_SECRET as string),
                databaseService.tokenRefreshToken.findOne({ token: value })
              ])

              if (refresh_token === null) {
                throw new AppError(USERS_MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXISTED, HTTP_STATUS.UNAUTHORIZED)
              }
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new AppError(error.message, HTTP_STATUS.UNAUTHORIZED)
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

const emailVerifyTokenValidator = validate(
  checkSchema(
    {
      email_verify_token: {
        custom: {
          options: async (value: string, { req }) => {
            try {
              if (value === undefined) {
                throw new AppError(USERS_MESSAGES.EMAIL_TOKEN_IS_REQUIRED, HTTP_STATUS.UNAUTHORIZED)
              }
              const decoded_email_verify_token = await verifyTokenHelper(
                value,
                process.env.EMAIL_TOKEN_SECRET as string
              )

              req.decoded_email_verify_token = decoded_email_verify_token
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new AppError(error.message, HTTP_STATUS.UNAUTHORIZED)
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

const forgotPasswordValidator = validate(
  checkSchema({
    mail: {
      isEmail: true,
      custom: {
        options: async (value: string, { req }) => {
          const user = await databaseService.users.findOne({ email: value })
          if (!user) {
            throw new AppError(USERS_MESSAGES.USER_IS_NOT_EXISTED, HTTP_STATUS.NOT_FOUND)
          }
          req.user = user
          return true
        }
      }
    }
  })
)

export {
  registerValidator,
  forgotPasswordValidator,
  loginValidator,
  protectRoute,
  retrictTo,
  emailVerifyTokenValidator
}
