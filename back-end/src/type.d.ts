import { Request } from 'express'
import User from './models/schemas/User.schema'
import jwt from 'jsonwebtoken'
declare module 'express' {
  interface Request {
    user?: User
    itemsWithCreatedBy?: any
    decoded_email_verify_token?: any
  }
}
declare module 'jsonwebtoken' {
  export interface JwtPayload extends jwt.JwtPayload {
    user_id?: string
  }
}

declare module 'mongodb' {
  export interface CollectionHasCreatedBy extends Collection {
    find
  }
}
