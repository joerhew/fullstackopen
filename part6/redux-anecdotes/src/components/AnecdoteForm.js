import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { showTimedNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    const anecdote = event.target.newAnecdote.value
    const msg = 'you created'
    dispatch(createAnecdote(anecdote))
    dispatch(showTimedNotification(`${msg} "${anecdote}"`))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
          <div>
            <input name="newAnecdote" />
            </div>
          <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm