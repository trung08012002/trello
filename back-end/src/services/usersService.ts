import { ObjectId } from 'mongodb'

import { TokenType, USERS_MESSAGES } from '~/constants/enum'
import { RegisterReqBody } from '~/models/requests/User.request'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import User, { UserMinimize, UserVerifyStatus } from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import hash from '~/utils/hash'
import signToken from '~/utils/signJwt'
import verifyTokenHelper from '~/utils/verifyToken'

import jwt from 'jsonwebtoken'
class UsersService {
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        tokenType: TokenType.AccessToken
      },
      privateKey: process.env.ACCESS_TOKEN_SECRET,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        tokenType: TokenType.RefreshToken
      },
      privateKey: process.env.REFRESH_TOKEN_SECRET,
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
      }
    })
  }
  async createToken(user_id: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    return {
      accessToken,
      refreshToken
    }
  }
  async createEmailToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        tokenType: TokenType.EmailVerifyToken
      },
      privateKey: process.env.EMAIL_TOKEN_SECRET,
      options: {
        expiresIn: process.env.EMAIL_TOKEN_EXPIRATION
      }
    })
  }
  async signup(payload: RegisterReqBody) {
    const userId = new ObjectId()
    const email_verify_token = await this.createEmailToken(userId.toString())
    const user = await databaseService.users.insertOne(
      new User({ _id: userId, ...payload, email_verify_token, password: await hash(payload['password']) })
    )

    const { accessToken, refreshToken } = await this.createToken(userId.toString())
    databaseService.tokenRefreshToken.insertOne(new RefreshToken({ token: refreshToken, user_id: user.insertedId }))
    return {
      accessToken,
      refreshToken,
      userId
    }
  }
  async login(user_id: ObjectId) {
    const { accessToken, refreshToken } = await this.createToken(user_id.toString())
    const { exp } = (await verifyTokenHelper(accessToken, process.env.ACCESS_TOKEN_SECRET as string)) as jwt.JwtPayload

    databaseService.tokenRefreshToken.insertOne(new RefreshToken({ token: refreshToken, user_id: user_id }))
    return {
      accessToken,
      refreshToken,
      exp
    }
  }
  async logout(refresh_token: string) {
    const result = await databaseService.tokenRefreshToken.deleteOne({ token: refresh_token })
    return result
  }
  async getAllUsersByIds(userIds: ObjectId[]) {
    const userCusor = databaseService.users.find({ _id: { $in: userIds } })
    const users = new Array<any>()
    for await (const user of userCusor) {
      {
        users.push(user)
      }
      return users
    }
  }
  async getAllUserMinimizesByIds(userIds: ObjectId[]) {
    const userCusor = databaseService.users.find({ _id: { $in: userIds } })
    const users = new Array<any>()
    for await (const user of userCusor) {
      {
        users.push(new UserMinimize({ ...user }))
      }

      return users
    }
  }
  async verifyEmail(user_id: string) {
    const [token] = await Promise.all([
      this.createToken(user_id),
      databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
        { $set: { email_verify_token: '', verify: UserVerifyStatus.Verified, updated_at: '$$NOW' } }
      ])
    ])
    const { accessToken, refreshToken } = token
    return { access_token: accessToken, refresh_token: refreshToken }
  }
  async resendEmailVerified(user_id: ObjectId) {
    const token = await this.createEmailToken(user_id.toString())
    //send token to email
    console.log(token)

    databaseService.users.updateOne({ _id: user_id }, [{ $set: { email_verify_token: token, updated_at: '$$NOW' } }])
    return { message: USERS_MESSAGES.RESEND_EMAIL_VERIFY_SUCCESS }
  }
  async createForgotPasswordToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        tokenType: TokenType.ForgotPasswordToken
      },
      privateKey: process.env.FORGOT_PASSWORD_SECRET,
      options: {
        expiresIn: process.env.FORGOT_PASSWORD_EXPIRATION
      }
    })
  }
  async forgotPassword(user_id: ObjectId) {
    const token = await this.createForgotPasswordToken(user_id.toString())
    await databaseService.users.updateOne({ _id: user_id }, [
      { $set: { forgot_password_token: token, updated_at: '$$NOW' } }
    ])
    //  gửi email to reset password
    console.log(token)
    return { message: USERS_MESSAGES.SEND_TOKEN_RESET_FORGOT_PASSWORD }
  }
}

const usersService = new UsersService()

export default usersService
