const blogsRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 });
  return response.json(blogs);
})

blogsRouter.post('/', async (request, response) => {
  let body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id)

  body = { ...body, user: user._id };

  if (!body.likes) {
    body.likes = 0;
  }

  if (body.title && body.url) {
    const blog = new Blog(body)
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();

    response.status(201).json(savedBlog);
  } else {
    response.status(400).end();
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const blogToDelete = await Blog.findById(id);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  
  if (!decodedToken.id) {
    console.log('decoded token id is ', decodedToken.id);
    return response.status(400).json({ error: 'need to supply a valid token with the request' });
  } else if (decodedToken.id !== blogToDelete.user.toString()) {
    console.log('decoded token id is ', decodedToken.id);
    console.log('blog user id is ', blogToDelete.user.toString());
    return response.status(401).json({ error: 'invalid token' });
  }

  const user = await User.findById(decodedToken.id)

  const updatedBlogs = user.blogs.filter(blog => blog.id !== id);

  await Blog.findByIdAndRemove(id);
  await User.findByIdAndUpdate(decodedToken.id, { blogs: updatedBlogs })

  response.status(204).end();
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedNote = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' }
  )
  console.log(updatedNote);

  response.json(updatedNote);
})

module.exports = blogsRouter;