import { ObjectId } from 'mongodb'
import Background from './background.schema'

export enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}
type UserType = {
  _id?: ObjectId
  name?: string
  day_of_birth?: Date
  password: string
  email: string
  role?: string
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  created_at?: Date
  updated_at?: Date
  password_changed_at?: Date
  password_reset_expires?: Date
  backgroundColor?: string
}
class User {
  _id?: ObjectId
  name: string
  day_of_birth: Date
  password: string
  email: string
  role: string
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  created_at: Date
  updated_at: Date
  password_changed_at?: Date
  password_reset_expires?: Date
  backgroundColor: string
  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.name = user.name || ''
    this.day_of_birth = user.day_of_birth || date
    this.password = user.password
    this.email = user.email
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.role = user.role || 'user'
    this.password_changed_at = user.password_changed_at
    this.password_reset_expires = user.password_reset_expires
    this.backgroundColor = user.backgroundColor || '#00875A'
  }
}
export class UserMinimize {
  _id?: ObjectId
  name: string
  backgroundColor: string
  email: string
  role: string

  constructor(user: UserType) {
    this._id = user._id
    this.name = user.name || ''

    this.email = user.email

    this.role = user.role || 'user'
    this.backgroundColor = user.backgroundColor || '#00875A'
  }
}
export default User
