import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogEntry from './BlogEntry'

describe('blog entry', () => {
  let container

  const blog = {
    title: 'a test blog',
    author: 'Joe',
    url: 'www.joe.com',
    likes: '10',
    user: 'joe'
  }

  let mockLikeHandler
  let mockDeleteHandler
  const mockLoggedInUser = 'user'

  beforeEach(() => {
    mockLikeHandler = jest.fn()
    mockDeleteHandler = jest.fn()

    container = render(<BlogEntry
      blog={blog}
      loggedInUser={mockLoggedInUser}
      handleLike={mockLikeHandler}
      handleDelete={mockDeleteHandler}/>).container
  })


  test('blog entry renders the blog\'s title, author; not its URL or likes', () => {

    const title = screen.getByText('a test blog')
    const author = screen.queryAllByText('Joe')
    const togglableDiv = document.getElementsByClassName('togglableContent')[0]

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(togglableDiv).toHaveStyle('display: none')
  })

  test('when the expand button is clicked, the blog\'s URL and likes are shown', async () => {

    const togglableDiv = document.getElementsByClassName('togglableContent')[0]

    expect(togglableDiv).toHaveStyle('display: none')

    const user = userEvent.setup()
    const button = screen.getByText('Expand')
    await user.click(button)

    expect(togglableDiv).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {

    const user = userEvent.setup()
    const expand = screen.getByText('Expand')
    await user.click(expand)
    const like = screen.getByText('Like')

    await user.click(like)
    await user.click(like)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})