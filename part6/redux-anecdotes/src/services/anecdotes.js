import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (anecdote) => {
  const response = await axios.get(`${baseUrl}/${anecdote.id}`)
  console.log(response)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content: content,
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (anecdote) => {
  const oldAnecdote = await get(anecdote)
  console.log(anecdote)

  const newAnecdote = {
    ...oldAnecdote,
    votes: oldAnecdote.votes + 1
  }

  const response = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote)
  return response.data
}

export default { getAll, get, createNew, vote }