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
    <div className="blogEntry" style={blogEntryStyle}>
      <div style={titleStyle}>
        {blog.title} <br />
      </div>
      Author: {blog.author} <br />
      <div style={showWhenExpanded} className="togglableContent">
        <div style={contentStyle}>
          URL: {blog.url} <br />
          Likes: {blog.likes}
          <button className="likeButton" onClick={like}>Like</button>
        </div>
        <div>
          <button onClick={toggleExpansion}>Collapse</button>
          {loggedInUser && loggedInUser.id === blog.user.id &&
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
  blog: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default BlogEntry