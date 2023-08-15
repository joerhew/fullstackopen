import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ user, addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = await blogService.create({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      user: user.id
    })

    addBlog(newBlog)

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

  }

  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <div>
          <label>
            title
            <input
              type="text"
              name="newBlogTitle"
              value={newBlogTitle}
              onChange={({ target }) => setNewBlogTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              name="newBlogAuthor"
              value={newBlogAuthor}
              onChange={({ target }) => setNewBlogAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              name="newBlogUrl"
              value={newBlogUrl}
              onChange={({ target }) => setNewBlogUrl(target.value)}
            />
          </label>
        </div>
        <button id='createBlog' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm