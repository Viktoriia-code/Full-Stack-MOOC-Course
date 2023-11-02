import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    voteForAnecdote: (state, action) => {
      const updatedAnecdote = state.find((a) => a.id === action.payload.id)
      if (updatedAnecdote) {
        updatedAnecdote.votes++
      }
      return state.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { voteForAnecdote, appendAnecdote, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.votes - a.votes)
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer