import { Router } from 'express'
import { userController } from '~/controllers'
import {
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  protectRoute,
  refreshTokenValidator,
  registerValidator
} from '~/middleware/users.middleware'

const usersRouter = Router()

usersRouter.post('/register', registerValidator, userController.registerController)
usersRouter.post('/login', loginValidator, userController.loginController)

usersRouter.post('/refresh-token', userController.refreshTokenController)

usersRouter.post('/logout', protectRoute, refreshTokenValidator, userController.logoutController)

usersRouter.post('/verify-email', emailVerifyTokenValidator, userController.emailVerifyTokenController)

usersRouter.post('/resend-email', protectRoute, userController.resendEmail)

usersRouter.post('/forgot-password', forgotPasswordValidator, userController.forgotPasswordController)

export default usersRouter
