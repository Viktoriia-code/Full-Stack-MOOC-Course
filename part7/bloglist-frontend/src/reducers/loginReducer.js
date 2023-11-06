import { createSlice } from '@reduxjs/toolkit'

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
  },
})

export const { setUser, clearUser } = loginReducer.actions
export default loginReducer.reducer
