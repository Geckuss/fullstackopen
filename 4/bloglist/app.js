import express, { json } from 'express'
const app = express()
import cors from 'cors'
import config from './utils/config.js'
import router from './controllers/blogs.js'
import { connect } from 'mongoose'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'

logger.info('connecting to', config.DB_URL)
connect(config.DB_URL)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(json())
app.use(middleware.requestLogger)
app.use('/api/blogs', router)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
export default app