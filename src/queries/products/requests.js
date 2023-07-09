const BASE_URL = 'http://localhost:4000/products'
import axios from 'axios'

export const postProduct = (product) => {
  return axios.post(BASE_URL, product)
}

export const postProductCost = (productCost) => {
  return axios.post(BASE_URL + "/costs", productCost)
}

export const putProduct = (product) => {
  return axios.put(BASE_URL + `/${product.id}`, {
    title: product.title
  })
}

export const getSingleProduct = async (id) => {
  return (await axios.get(BASE_URL + `/${id}`)).data
}

export const getProducts = async ({
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