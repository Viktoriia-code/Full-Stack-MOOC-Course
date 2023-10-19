import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../actions/notificationActions'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createAnecdote(content))
    dispatch(showNotification(`You created a new anecdote: "${content}"`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name="note" /></div>
          <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewAnecdote