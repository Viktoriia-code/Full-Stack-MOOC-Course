import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    removeNotification: (state) => {
      return null
    },
  },
})

export const { setNotification, removeNotification } =
  notificationReducer.actions
export default notificationReducer.reducer
