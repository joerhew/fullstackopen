import { useState, useEffect } from 'react'

import BlogEntry from './components/BlogEntry'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import userService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null, type: null});

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [])

  const addBlog = (blog) => {
    const message = `a new blog ${blog.title} by ${blog.author} has been added.`
    const type = 'success'

    showNotification(message, type)

    setBlogs(blogs.concat(blog));
  }

  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000);
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
          <BlogEntry key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App