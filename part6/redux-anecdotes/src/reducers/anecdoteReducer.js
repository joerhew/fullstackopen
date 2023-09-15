import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

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
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload 
    }
  }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer