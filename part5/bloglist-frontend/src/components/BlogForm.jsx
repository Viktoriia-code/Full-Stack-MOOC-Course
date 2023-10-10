import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({
  createBlog
}) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
      title: <input
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
          id="title-input"
        /><br />
      author: <input
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
          id="author-input"
        /><br />
      url: <input
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
          id="url-input"
        /><br />
        <button type="submit">create new blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm