import { useState, useEffect } from 'react'
import BlogEntry from './components/BlogEntry'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
    setBlogs(blogs.concat(blog));
  }

  return (
    <div>
      <h2>blogs</h2>
      <Login setUser={setUser} user={user} />
      {user && 
        <div>
          <h2>create new</h2>
          <BlogForm setUser={setUser} user={user} addBlog={addBlog} />
        </div>
      }
      {user && blogs.map(blog =>
        <BlogEntry key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App