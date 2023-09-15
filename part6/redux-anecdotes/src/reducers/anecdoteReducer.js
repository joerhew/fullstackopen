import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const sort = (array, key) => {
  const sortedArray = [...array].sort((a, b) => b[key] - a[key])
  return sortedArray
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
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
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer