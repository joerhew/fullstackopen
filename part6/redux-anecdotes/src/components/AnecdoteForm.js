import { create } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(create(event))
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