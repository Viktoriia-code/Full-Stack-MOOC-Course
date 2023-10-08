import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  return (
    <div className='error'>
      {errorMessage}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const noteFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
    })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    noteFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        setMessage(`a new blog ${newBlogTitle} by ${newBlogAuthor} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
        blogService.getAll()
          .then(blogs => {
            const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
            setBlogs( sortedBlogs )
          })
      })
  }

  const addLike = (blog) => {
    console.log(blog)
    const blogObject = {
      ...blog,
      likes: blog.likes+1
    }
    blogService
      .update(blog.id, blogObject)
      .then(() => {
        blogService.getAll()
          .then(blogs => {
            const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
            setBlogs( sortedBlogs )
          })
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification errorMessage={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
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
        <BlogForm
          newBlogTitle={newBlogTitle}
          newBlogAuthor={newBlogAuthor}
          newBlogUrl={newBlogUrl}
          handleNewBlogTitleChange={({ target }) => setNewBlogTitle(target.value)}
          handleNewBlogAuthor={({ target }) => setNewBlogAuthor(target.value)}
          handleNewBlogUrl={({ target }) => setNewBlogUrl(target.value)}
          addBlog={addBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          user={user}
          addLike={addLike} />
      )}
    </div>
  )
}

export default App