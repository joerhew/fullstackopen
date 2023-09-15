import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { showTimedNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(createAnecdote(content))

    const msg = 'you created'
    dispatch(showTimedNotification(`${msg} "${content}"`))
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