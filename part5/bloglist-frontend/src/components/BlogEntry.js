const BlogEntry = ({blog}) => {
  const blogEntryStyle = {
    backgroundColor: 'lightgray',
    margin: '1rem',
    padding: '1rem',
    width: '50%'
  }

  return (
    <div style={blogEntryStyle}>
      Title: {blog.title} <br />
      Author: {blog.author} <br />
      URL: {blog.url} <br />
      User: {blog.user.username}
    </div>  
  )
}

export default BlogEntry