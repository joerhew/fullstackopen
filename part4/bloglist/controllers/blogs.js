const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
})

blogsRouter.post('/', async (request, response) => {
  let body = request.body;

  if (!body.likes) {
    body.likes = 0;
  }

  if (body.title && body.url) {
    const blog = new Blog(body)
    const result = await blog.save();
    response.status(201).json(result);
  } else {
    response.status(400).end();
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  await Blog.findByIdAndRemove(id);
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