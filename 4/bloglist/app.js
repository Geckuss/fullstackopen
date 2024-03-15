import express, { json } from 'express'
const app = express()
import cors from 'cors'
import { Schema, model, connect } from 'mongoose'
import config from './utils/config.js'

const blogSchema = Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = model('Blog', blogSchema)

const mongoUrl = process.env.DB_URL
connect(mongoUrl)

app.use(cors())
app.use(json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

export default app