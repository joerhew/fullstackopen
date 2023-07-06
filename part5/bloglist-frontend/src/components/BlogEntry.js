import { useState } from 'react'

const BlogEntry = ({blog}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const showWhenExpanded = {display: isExpanded ? '' : 'none'}
  const hideWhenExpanded = {display: isExpanded ? 'none' : ''}
  
  const toggleExpansion = () => setIsExpanded(!isExpanded);

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

  console.log(blog);

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
          <button>Like</button>
        </div>
        <div>
          <button onClick={toggleExpansion}>Collapse</button>
        </div>
      </div>
      <div style={hideWhenExpanded}>
        <button onClick={toggleExpansion}>Expand</button>
      </div>
    </div>  
  )
}

export default BlogEntry