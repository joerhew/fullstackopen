const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'root', name: 'user', passwordHash })

  await user.save();
})

/*
user name
  minLength: 3,
  required: true,
  unique: true
password
  length: 3
either username or password is missing
*/

describe('creating a new user', () => {
  test('creating a user without a username returns status code 400 and an appropriate error message', async () => {
    const userNoUsername = {
      name: 'Archie',
      password: 'bald'
    }

    await api
      .post('/api/users')
      .send(userNoUsername)
      .expect(400)
      .expect(response => {
        expect(response.body.error).toBe('username or password is missing');
      })
  })

  test('creating a user without a password returns status code 400 and an appropriate error message', async () => {
    const userNoPassword = {
      username: 'bob',
      name: 'Bob'
    }

    await api
      .post('/api/users')
      .send(userNoPassword)
      .expect(400)
      .expect(response => {
        expect(response.body.error).toBe('username or password is missing');
      })
  })

  test('creating a user with too short a username returns status code 400 and an appropriate error message', async () => {
    const userShortUsername = {
      username: 'ca',
      password: 'therine'
    }

    await api
      .post('/api/users')
      .send(userShortUsername)
      .expect(400)
      .expect(response => {
        expect(response.body.error).toBe('user validation failed: username: Path `username` (`ca`) is shorter than the minimum allowed length (3).');
      })
  })

  test('creating a user with too short a password returns status code 400 and an appropriate error message', async () => {
    const userShortPassword = {
      username: 'david',
      password: 'hi'
    }

    await api
      .post('/api/users')
      .send(userShortPassword)
      .expect(400)
      .expect(response => {
        expect(response.body.error).toBe('password needs to be at least 3 characters long');
      })
  })

  test('creating a valid user works correctly and returns status code 201', async () => {
    const validUser = {
      username: 'maud',
      password: 'rhew'
    }

    const usersAtStart = await api.get('/api/users')

    await api
      .post('/api/users')
      .send(validUser)
      .expect(201)

    const usersAtEnd = await api.get('/api/users')

    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1)

  })

  test('creating a nonunique user works correctly and returns status code 201', async () => {
    const nonUniqueUser = {
      username: 'root',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(nonUniqueUser)
      .expect(400)
      .expect(response => {
        expect(response.body.error).toBe('user validation failed: username: Error, expected `username` to be unique. Value: `root`');
      })
  })
})

afterAll(async () => {
  await mongoose.connection.close();
})