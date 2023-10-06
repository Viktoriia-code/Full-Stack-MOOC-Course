import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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
      })
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      title: <input
        value={newBlogTitle}
        onChange={({ target }) => setNewBlogTitle(target.value)}
      /><br />
      author: <input
        value={newBlogAuthor}
        onChange={({ target }) => setNewBlogAuthor(target.value)}
      /><br />
      url: <input
        value={newBlogUrl}
        onChange={({ target }) => setNewBlogUrl(target.value)}
      /><br />
      <button type="submit">create</button>
    </form>
  )


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
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App