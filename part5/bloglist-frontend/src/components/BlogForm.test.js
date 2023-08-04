import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

jest.mock('../services/blogs')

describe('blog form', () => {

  const mockAddBlogHandler = jest.fn()
  const mockSetUser = jest.fn()
  const mockUser = 'user'

  render(<BlogForm
    setUser={mockSetUser}
    user={mockUser}
    addBlog={mockAddBlogHandler} />)

  beforeEach(() => {
    blogService.create.mockResolvedValue({
      title: 'title',
      author: 'author',
      url: 'url',
      user: 'user',
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const user = userEvent.setup()

    const title = await screen.findByLabelText('title')
    const author = await screen.findByLabelText('author')
    const url = await screen.findByLabelText('url')

    await user.type(title, 'title')
    await user.type(author, 'author')
    await user.type(url, 'url')

    const createButton = await screen.findByText('create')
    await user.click(createButton)

    expect(mockAddBlogHandler.mock.calls).toHaveLength(1)
  })
})