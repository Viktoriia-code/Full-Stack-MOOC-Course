import PropTypes from 'prop-types'
import { useContext, createContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return `You added a new anecdote: ${action.data}`
    case 'VOTE':
      return `You voted for: ${action.data}`
    case 'CLEAR':
      return null
    case 'ERROR':
      return `Error: ${action.error}`
    default:
      return null
  }
};

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};


NotificationContextProvider.propTypes = {
  children: PropTypes.node,
}

export default NotificationContext