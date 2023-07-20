import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogEntry = ({ blog, loggedInUser, handleLike, handleDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const showWhenExpanded = { display: isExpanded ? '' : 'none' }
  const hideWhenExpanded = { display: isExpanded ? 'none' : '' }

  const toggleExpansion = () => setIsExpanded(!isExpanded)

  const like = () => {
    handleLike(blog.id)
  }

  const deleteBlog = () => {
    handleDelete(blog.id)
  }

  const blogEntryStyle = {
    backgroundColor: 'lightgray',
    margin: '1rem',
    padding: '1rem',
    width: '50%'
  }

  const titleStyle = {
    fontSize: '1.3rem',
    marginBottom: '1rem'
  }

  const contentStyle = {
    marginBottom: '1rem'
  }

  return (
    <div style={blogEntryStyle}>
      <div style={titleStyle}>
        {blog.title} <br />
      </div>
      <div style={showWhenExpanded}>
        <div style={contentStyle}>
          Author: {blog.author} <br />
          URL: {blog.url} <br />
          User: {blog.user.username} <br />
          Likes: {blog.likes}
          <button onClick={like}>Like</button>
        </div>
        <div>
          <button onClick={toggleExpansion}>Collapse</button>
          {loggedInUser.id === blog.user.id &&
            <button onClick={deleteBlog}>Delete</button>
          }
        </div>
      </div>
      <div style={hideWhenExpanded}>
        <button onClick={toggleExpansion}>Expand</button>
      </div>
    </div>
  )
}

BlogEntry.propTypes = {
  key: PropTypes.string.isRequired,
  blog: PropTypes.string.isRequired,
  loggedInUser: PropTypes.string.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default BlogEntry