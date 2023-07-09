const BASE_URL = 'http://localhost:4000/costs'
import axios from 'axios'

export const postCost = (cost) => {
  return axios.post(BASE_URL, cost)
}

export const putCost = (cost) => {
  return axios.put(BASE_URL + `/${cost.id}`, {
    title: cost.title
  })
}

export const deleteCost = async (id) => {
  return (await axios.delete(BASE_URL + `/${id}`)).data
}

export const getSingleCost = async (id) => {
  return (await axios.get(BASE_URL + `/${id}`)).data
}

export const getCosts = async ({
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

export const searchCost = async (term) => {
  return (await axios.get(BASE_URL + `/search/${term}`)).data
}