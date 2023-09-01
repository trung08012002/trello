import express from 'express'

import { protectRoute } from '~/middleware/users.middleware'
import { workSpaceTypesController } from '~/controllers'

const workSpaceTypesRoute = express.Router()

workSpaceTypesRoute.get('/', protectRoute, workSpaceTypesController.getAllWorkSpaceType)

workSpaceTypesRoute.post('/:id', protectRoute, workSpaceTypesController.createWorkSpaceType)

workSpaceTypesRoute.patch('/:id', protectRoute, workSpaceTypesController.updateWorkSpaceType)

workSpaceTypesRoute.delete('/:id', protectRoute, workSpaceTypesController.deleteWorkSpaceType)

export default workSpaceTypesRoute
