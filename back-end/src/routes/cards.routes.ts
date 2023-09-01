import { Router } from 'express'
import { cardController } from '~/controllers'

import { protectRoute } from '~/middleware/users.middleware'

const cardsRouter = Router()

cardsRouter.post('/c/:columnId', protectRoute, cardController.AddCard)
cardsRouter.patch('/:cardId', protectRoute, cardController.UpdateCard)
cardsRouter.delete('/:cardId', protectRoute, cardController.deleteCard)
export default cardsRouter
