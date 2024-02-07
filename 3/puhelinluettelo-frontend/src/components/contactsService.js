import axios from 'axios'

const baseUrl = '/api/persons' // Replace with your server URL

export const getAll = () => {
    return axios.get(baseUrl)
}
  
export const create = newContact => {
  return axios.post(baseUrl, newContact)
}

export const deleteContact = id => {
    console.log('deleting', id)
    return axios.delete(`${baseUrl}/${id}`)
}

export const updateContact = (id, updatedContact) => {
    return axios.put(`${baseUrl}/${id}`, updatedContact)
}