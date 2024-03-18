import { Router } from "express";
const router = Router();
import Blog from '../models/blog.js'

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