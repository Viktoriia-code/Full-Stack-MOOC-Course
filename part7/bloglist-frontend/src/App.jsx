import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams, useNavigate
} from 'react-router-dom'

import { initializeBlogs, createBlog, voteBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser, clearUser } from './reducers/loginReducer'
import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from './actions/notificationActions'

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  return <div className="error">{errorMessage}</div>
}

const Users = ({ users }) => (
  <div>
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const Blogs = ({ blogs,user,addLike }) => (
  <div>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        addLike={addLike}
      />
    ))}
  </div>
)

const UserView = ({ users }) => {
  const id = useParams().id
  const user = users.find(n => n.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

const BlogView = ({ blogs, addLike }) => {
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  console.log(blog)
  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      {blog.likes} likes
      <button onClick={() => addLike(blog)}>like</button>
      <p>added by {blog.author}</p>
    </div>
  )
}

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 10
  }
  const bg = {
    background: 'lightgray',
    padding: 10
  }
  return (
    <div style={bg}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {user.name} logged in<button onClick={handleLogout}>logout</button>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const noteFormRef = useRef()

  const blogs = useSelector(state => {
    return state.blogs
  })

  const user = useSelector(state => {
    return state.user
  })

  const users = useSelector(state => {
    return state.users
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      dispatch(setUser(user))
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      //setUser(user)
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
    dispatch(clearUser())
    dispatch(showNotification('The user is logged out!', 5))
  }

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
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
    <Router>
      <Menu user={user} handleLogout={handleLogout} />
      <h2>blogs</h2>
      <Notification message={message} />
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <Routes>
        <Route path="/" element={<Blogs blogs={blogs} user={user} addLike={addLike} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserView users={users} />} />
        <Route path="/blogs/:id" element={<BlogView blogs={blogs} addLike={addLike} />} />
      </Routes>
    </Router>
  )
}

export default App
