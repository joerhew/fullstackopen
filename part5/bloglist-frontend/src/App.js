import { useState, useEffect } from 'react'

import BlogEntry from './components/BlogEntry'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = sort(blogs, 'likes')
      setBlogs(sortedBlogs)
    }

    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sort = (array, key) => {
    const sortedArray = [...array].sort((a, b) => b[key] - a[key])
    return sortedArray
  }

  const addBlog = (blog) => {
    const message = `a new blog ${blog.title} by ${blog.author} has been added.`
    const type = 'success'

    showNotification(message, type)
    const sortedBlogs = sort(blogs.concat(blog), 'likes')
    setBlogs(sortedBlogs)
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })

    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const like = async (id) => {
    const blog = blogs.find(blog => blog.id === id)

    const updatedBlog = {
      likes: blog.likes + 1
    }

    const response = await blogService.update(id, updatedBlog)

    const updatedBlogs = blogs.map(blog => (
      blog.id !== id
        ? blog
        : { ...blog, likes: response.likes }
    ))

    const sortedBlogs = sort(updatedBlogs, 'likes')

    setBlogs(sortedBlogs)
  }

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find(blog => (blog.id === id))

    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      await blogService.remove(id)

      const updatedBlogs = blogs.filter(blog => (blog.id !== id))

      const sortedBlogs = sort(updatedBlogs, 'likes')
      setBlogs(sortedBlogs)
    }

  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type}/>
      <LoginForm setUser={setUser} user={user} showNotification={showNotification} />
      {user &&
        <Togglable showButtonLabel='add new blog' hideButtonLabel="cancel">
          <div>
            <h2>create new</h2>
            <BlogForm setUser={setUser} user={user} addBlog={addBlog} />
          </div>
        </Togglable>
      }
      {user && blogs.map(blog =>
        <BlogEntry key={blog.id} blog={blog} loggedInUser={user} handleLike={like} handleDelete={deleteBlog} />
      )}
    </div>
  )
}

export default App