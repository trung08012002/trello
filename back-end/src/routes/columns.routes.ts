import { Router } from 'express'
import { boardController, columnController } from '~/controllers'
import checkCreatedByMiddleware from '~/middleware/checkIsCreated.middleware'

import { protectRoute } from '~/middleware/users.middleware'
import databaseService from '~/services/database.services'

const columnsRoute = Router()

columnsRoute.post('/b/:boardId', protectRoute, columnController.addColumn)

columnsRoute.delete(
  '/:id',
  protectRoute,

  columnController.deleteColumnById
)

columnsRoute.patch('/:id', protectRoute, columnController.updateColumn)

export default columnsRoute
