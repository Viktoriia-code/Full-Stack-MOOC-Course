import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    voteForBlog: (state, action) => {
      const updatedBlog = state.find((a) => a.id === action.payload.id)
      if (updatedBlog) {
        updatedBlog.votes++
      }
      return state.sort((a, b) => b.votes - a.votes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { voteForBlog, appendBlog, setBlogs } = blogSlice.actions

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

export default blogSlice.reducer