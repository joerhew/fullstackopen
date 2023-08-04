import axios from 'axios'
const baseUrl = '/api/blogs'
console.log('blogs.js is updated')
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(token)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updatedObject) => {
  const url = baseUrl + '/' + id
  const response = await axios.put(url, updatedObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = baseUrl + '/' + id
  const response = await axios.delete(url, config)
  return response.data
}

export default { setToken, getAll, create, update, remove }