import { Router } from 'express'
import { imageController } from '~/controllers'

const ImagesRoutes = Router()

ImagesRoutes.get('/:number', imageController.getOnlyNumberImages)

ImagesRoutes.post('/', imageController.createBackgroundImage)

export default ImagesRoutes
