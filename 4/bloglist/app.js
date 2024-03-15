import express, { json } from 'express'
const app = express()
import cors from 'cors'
import config from './utils/config.js'
import router from './controllers/blogs.js'
import { connect } from 'mongoose'

const mongoUrl = process.env.DB_URL
connect(mongoUrl)

app.use(cors())
app.use(json())
app.use('/api/blogs', router)
export default app