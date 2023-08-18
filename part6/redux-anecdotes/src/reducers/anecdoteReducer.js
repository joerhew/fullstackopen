const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const sort = (array, key) => {
  const sortedArray = [...array].sort((a, b) => b[key] - a[key])
  return sortedArray
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id: id
    }
  }
}

export const create = (event) => {
  return {
    type: 'CREATE',
    payload: {
      content: event.target.newAnecdote.value
    }
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.payload.id
      const anecdoteToUpvote = state.find(n => n.id === id)
      const upvotedAnecdote = {
        ...anecdoteToUpvote,
        votes: anecdoteToUpvote.votes + 1
      }
      const newList = state.map(anecdote =>
        anecdote.id !== id ? anecdote : upvotedAnecdote
      )
      return sort(newList, 'votes')
    case 'CREATE':
      const newAnecdote = {
        content: action.payload.content,
        id: getId(),
        votes: 0
      }
      return state.concat(newAnecdote)
    default: return state
  }
}

export default reducer