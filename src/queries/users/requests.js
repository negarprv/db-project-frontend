const BASE_URL = 'http://localhost:4000/users'
const BASE_URL_AUTH = 'http://localhost:4000/auth'
import axios from 'axios'

export const postUser = (user) => {
  return axios.post(BASE_URL_AUTH + '/register', user)
}

export const getUsers = async ({
  per_page,
  page,
  sort_order,
  sort_by
} = {
  per_page: 20,
  page: 1,
  sort_order: "DESC",
  sort_by: "created_at"
}) => {
  return (await axios.get(BASE_URL + `?per_page=${per_page}&page=${page}&sort_order=${sort_order}&sort_by=${sort_by}`)).data
}