const blogsRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 });
  return response.json(blogs);
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id)
  return response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  let body = request.body;

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'token invalid' });
  }

  body = { ...body, user: user._id };

  if (!body.likes) {
    body.likes = 0;
  }

  if (body.title && body.url) {
    const blog = new Blog(body)
    let savedBlog = await blog.save();
    savedBlog = await savedBlog.populate('user', { username: 1 })

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

  console.log(request);
  const user = request.user;

  if (!user) {
    return response.status(400).json({ error: 'need to supply a valid token with the request' });
  } else if (user.id !== blogToDelete.user.toString()) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const updatedBlogs = user.blogs.filter(blog => blog.id !== id);

  await Blog.findByIdAndRemove(id);
  await User.updateOne({ _id: user._id }, { blogs: updatedBlogs })

  response.status(204).end();
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes, author, title, url } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes, author, title, url },
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(updatedBlog);
})

module.exports = blogsRouter;