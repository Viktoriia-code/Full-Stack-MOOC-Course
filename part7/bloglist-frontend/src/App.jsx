import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

import { initializeBlogs, createBlog, voteBlog } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from './actions/notificationActions'

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  return <div className="error">{errorMessage}</div>
}

/*const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="message">{message}</div>
}*/

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const noteFormRef = useRef()

  const blogs = useSelector(state => {
    return state.blogs
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  /*useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])*/

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
  }

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
    /*blogService.create(blogObject).then((returnedNote) => {
      //setBlogs(blogs.concat(returnedNote))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      blogService.getAll().then((blogs) => {
        const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
        //setBlogs(sortedBlogs)
      })
    })*/
    dispatch(createBlog(blogObject))
    dispatch(showNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5))
  }

  const addLike = (blog) => {
    console.log(blog)
    const blogObject = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(voteBlog(blogObject))
    /*blogService.update(blog.id, blogObject).then(() => {
      blogService.getAll().then((blogs) => {
        const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      })
    })*/
    dispatch(showNotification(`You voted for the anecdote: "${blog.title}"`, 5))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <ErrorNotification errorMessage={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user.name} logged in<button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          //setBlogs={setBlogs}
          user={user}
          addLike={addLike}
        />
      ))}
    </div>
  )
}

export default App
