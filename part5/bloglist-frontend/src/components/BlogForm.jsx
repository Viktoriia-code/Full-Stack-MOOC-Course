import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  handleNewBlogTitleChange,
  handleNewBlogAuthor,
  handleNewBlogUrl,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl
}) => {
  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
      title: <input
          value={newBlogTitle}
          onChange={handleNewBlogTitleChange}
        /><br />
      author: <input
          value={newBlogAuthor}
          onChange={handleNewBlogAuthor}
        /><br />
      url: <input
          value={newBlogUrl}
          onChange={handleNewBlogUrl}
        /><br />
        <button type="submit">create new blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleNewBlogTitleChange: PropTypes.func.isRequired,
  handleNewBlogAuthor: PropTypes.func.isRequired,
  handleNewBlogUrl: PropTypes.func.isRequired,
  newBlogTitle: PropTypes.string.isRequired,
  newBlogAuthor: PropTypes.string.isRequired,
  newBlogUrl: PropTypes.string.isRequired
}

export default BlogForm