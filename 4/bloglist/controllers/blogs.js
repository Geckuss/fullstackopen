import { Router } from "express";
const router = Router();
import Blog from '../models/blog.js';
import { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } from '../utils/list_helper.js';

router.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({});
        
        const dummyResult = dummy(blogs);
        const totalLikesResult = totalLikes(blogs);
        const favoriteBlogResult = favoriteBlog(blogs);
        const mostBlogsResult = mostBlogs(blogs);
        const mostLikesResult = mostLikes(blogs);

        response.json({
            blogs,
            dummyResult,
            totalLikesResult,
            favoriteBlogResult,
            mostBlogsResult,
            mostLikesResult
        });
    } catch (error) {
        response.status(500).json({ error: 'Something went wrong' });
    }
});
  
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