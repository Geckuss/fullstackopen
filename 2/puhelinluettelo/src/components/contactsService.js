import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons' // Replace with your server URL

export const getAll = () => {
    return axios.get(baseUrl)
}
  
export const create = newContact => {
  return axios.post(baseUrl, newContact)
}