import express from 'express'

import { protectRoute } from '~/middleware/users.middleware'
import { workSpaceController } from '~/controllers'
import checkIsCreatedBy from '~/middleware/checkIsCreated.middleware'
import databaseService from '~/services/database.services'
import checkCreatedByMiddleware from '~/middleware/checkIsCreated.middleware'
import CheckIsMember from '~/middleware/checkIsMember.middleware'
const workSpacesRoute = express.Router()

workSpacesRoute.get('/', protectRoute, workSpaceController.getWorkSpacesByIdUser)

workSpacesRoute.get('/:id', protectRoute, workSpaceController.getWorkSpacesById)

workSpacesRoute.post('/', protectRoute, workSpaceController.createWorkSpace)

workSpacesRoute.patch(
  '/:id',
  protectRoute,
  checkCreatedByMiddleware(databaseService.workSpaces),
  workSpaceController.updateWorkSpace
)

workSpacesRoute.delete(
  '/:id',
  protectRoute,
  checkCreatedByMiddleware(databaseService.workSpaces),
  workSpaceController.deleteWorkSpace
)
export default workSpacesRoute
