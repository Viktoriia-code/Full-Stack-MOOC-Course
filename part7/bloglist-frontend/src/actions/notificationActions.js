import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'

let notificationTimeoutId

export const showNotification = (message, durationInSeconds) => {
  return (dispatch) => {
    if (notificationTimeoutId) {
      clearTimeout(notificationTimeoutId)
    }

    dispatch(setNotification(message))
    notificationTimeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, durationInSeconds * 1000)
  }
}

export const hideNotification = () => {
  return (dispatch) => {
    dispatch(removeNotification())
  }
}
