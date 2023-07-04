const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'root', name: 'user', passwordHash })

  await user.save();
})

test('all blogs are returned', async () => {
  const blogs = await api.get('/api/blogs');

  expect(blogs.body).toHaveLength(helper.initialBlogs.length);
})

test('the unique identifier property of a blog is named id and not _id', async () => {
  const blogs = await api.get('/api/blogs');

  for (let blog of blogs.body) {
    expect(blog.id).toBeDefined();
    expect(blog._id).not.toBeDefined();
  }

})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Testing is hard',
    author: 'Koala Bear',
    url: 'http://www.google.com',
    likes: 12345,
  }

  const loginResponse = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'secret'
    })

  const token = loginResponse.body.token;

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titlesAtEnd = blogsAtEnd.map(blog => blog.title)
  expect(titlesAtEnd).toContain(
    'Testing is hard'
  );
});

test('not providing a token when creating a blog results in status code 401', async () => {
  const newBlog = {
    title: 'Testing is hard',
    author: 'Koala Bear',
    url: 'http://www.google.com',
    likes: 12345,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
});

test('if the likes property is missing from a request, it will default to 0', async () => {
  const newBlog = {
    title: 'Testing is hard',
    author: 'Koala Bear',
    url: 'http://www.google.com',
  }

  const loginResponse = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'secret'
    })

  const token = loginResponse.body.token;

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const addedBlog = blogsAtEnd.filter(blog => blog.title === newBlog.title)[0]

  expect(addedBlog.likes).toEqual(0);

});

test('if the title or url properties are missing, status code 400 is returned', async () => {
  const blogNoTitle = {
    author: 'Koala Bear',
    url: 'http://www.google.com',
  }

  const blogNoUrl = {
    title: 'Testing is hard',
    author: 'Koala Bear',
  }

  const loginResponse = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'secret'
    })

  const token = loginResponse.body.token;

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(blogNoTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(blogNoUrl)
    .expect(400)
})

test('a note with a valid id is deleted', async () => {
  const newBlog = {
    title: 'Testing is hard',
    author: 'Koala Bear',
    url: 'http://www.google.com',
    likes: 12345,
  }

  const loginResponse = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'secret'
    })

  const token = loginResponse.body.token;

  const createdBlog = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  await api
    .delete(`/api/blogs/${createdBlog.body.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs');
  const idsOfBlogsAtEnd = blogsAtEnd.body.map(blog => blog.id);
  expect(idsOfBlogsAtEnd).not.toContain(createdBlog.body.id);
})

test('a note is properly updated', async () => {
  const blogsAtStart = await api.get('/api/blogs');
  const blogBeforeUpdate = blogsAtStart.body[0];

  const infoToUpdate = {
    author: 'Joe Rhew',
    title: 'Fullstack programming is fun',
    url: 'www.joerhew.com',
    likes: 1000000
  }

  await api
    .put(`/api/blogs/${blogBeforeUpdate.id}`)
    .send(infoToUpdate)

  const blogsAtEnd = await api.get('/api/blogs');

  const blogAfterUpdate = blogsAtEnd.body.find(blog => blog.id === blogBeforeUpdate.id)

  expect(blogAfterUpdate).toBeDefined();
  expect(blogAfterUpdate.author).toBe(infoToUpdate.author);
  expect(blogAfterUpdate.title).toBe(infoToUpdate.title);
  expect(blogAfterUpdate.url).toBe(infoToUpdate.url);
  expect(blogAfterUpdate.likes).toBe(infoToUpdate.likes);
})

afterAll(async () => {
  await mongoose.connection.close();
})