import { Router } from "express";
const router = Router();
import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
  
const Blog = mongoose.model('Blog', blogSchema)

router.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})
  
router.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body;
  
    const blog = new Blog({
      title,
      author,
      url,
      likes
    });
  
    const savedBlog = await blog.save();
    response.json(savedBlog);
  });

export default router;