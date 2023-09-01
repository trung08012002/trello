import { catchAsync } from '~/utils/catchAsync'
import { Request, Response } from 'express'
import backgroundService from '~/services/backgroundImage.services'
import BackgroundRequest from '~/models/requests/background'
import { ParamsDictionary } from 'express-serve-static-core'
import Background from '~/models/schemas/background.schema'

const getOnlyNumberImages = catchAsync(async (req: Request, res: Response) => {
  const number = parseInt(req.params.number)
  const images = await backgroundService.getOnlyNumberImages(number)
  res.status(200).json({
    status: 200,
    images: images
  })
})

const createBackgroundImage = catchAsync(
  async (req: Request<ParamsDictionary, any, BackgroundRequest>, res: Response) => {
    const resut = await backgroundService.createImage(new Background(req.body))

    res.status(200).json({
      status: 200,
      id: resut.insertedId
    })
  }
)

export default {
  getOnlyNumberImages,
  createBackgroundImage
}
