import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    voteForBlog: (state, action) => {
      const updatedBlogs = state.map(blog => ({
        ...blog,
        likes: blog.id === action.payload.id ? blog.likes + 1 : blog.likes
      }))
      return updatedBlogs.sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    commentToBlog(state, action) {
      const updatedBlogs = state.map(blog => ({
        ...blog,
        comments: blog.id === action.payload.id ? action.payload.comments : blog.comments
      }))
      return updatedBlogs.sort((a, b) => b.likes - a.likes)
    },
    removeBlog(state, action) {
      const index = state.findIndex(blog => blog.id === action.payload)
      if (index !== -1) {
        state.splice(index, 1)
      }
      return state
    }
  }
})

export const { voteForBlog, appendBlog, setBlogs, removeBlog, commentToBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.votes - a.votes)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const voteBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch(voteForBlog(updatedBlog))
  }
}

export const commentBlog = (id,comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(id, comment)
    dispatch(commentToBlog(updatedBlog))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer