import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams, useNavigate
} from 'react-router-dom'

const Blog = ({ blog, setBlogs, user, addLike }) => {
  const dispatch = useDispatch()

  /*const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }*/

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteBlogById = (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      /*blogService.remove(id).then(() => {
        blogService.getAll().then((blogs) => {
          const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
          setBlogs(sortedBlogs)
        })
      })*/
      dispatch(deleteBlog(id))
    }
  }

  return (
    <div style={blogStyle} className="blog">
      {/*<div style={hideWhenVisible}>*/}
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      {/*<button onClick={() => setBlogVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setBlogVisible(false)}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={() => addLike(blog)}>like</button>
        <br />
        {blog.user ? blog.user.name : 'Unknown User'}
        <br />
        {blog.user && blog.user.name === user.name && (
          <button onClick={() => deleteBlogById(blog.id)}>remove</button>
        )}
      </div>*/}
    </div>
  )
}

export default Blog
