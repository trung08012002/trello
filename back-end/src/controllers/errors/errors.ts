import { NextFunction, Request, Response } from 'express'

async function GlobalErrorHandler(err: Error | any, req: Request, res: Response, next: NextFunction) {
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message
  })
}

export { GlobalErrorHandler }
