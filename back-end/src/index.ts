// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors')
import databaseService from '~/services/database.services'
import usersRouter from './routes/users.routes'
import { GlobalErrorHandler } from './controllers/errors/errors'
import workSpacesRoute from './routes/workSpaces.routes'
import boardRouter from './routes/boards.routes'
import columnsRoute from './routes/columns.routes'
import cardsRoute from './routes/cards.routes'
import ImagesRoutes from './routes/images.routes'

const app = express()

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3001',

    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
)
app.use(cookieParser())
app.use(express.json())
databaseService.connect()

app.use('/users', usersRouter)

app.use('/workSpaces', workSpacesRoute)

app.use('/boards', boardRouter)

app.use('/columns', columnsRoute)

app.use('/cards', cardsRoute)

app.use('/images', ImagesRoutes)

app.use(GlobalErrorHandler)

app.listen(process.env.PORT || 8000)

export default app
