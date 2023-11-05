import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = null

const loginReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    clearUser: (state) => {
      return null
    },
    setUsers: (state, action) => {
      return action.payload
    },
  },
})

export const { setUser, clearUser, setUsers } = loginReducer.actions

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default loginReducer.reducer
