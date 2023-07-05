import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ user, setUser, addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  const handleNewBlog = async (event) => {
    event.preventDefault();

    const newBlog = await blogService.create({ 
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      user: user.id
    })

    addBlog(newBlog);

    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');

  }

  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <div>
          title 
          <input
            type="text"
            name="newBlogTitle"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author 
          <input
            type="text"
            name="newBlogAuthor"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url 
          <input
            type="text"
            name="newBlogUrl"
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm;