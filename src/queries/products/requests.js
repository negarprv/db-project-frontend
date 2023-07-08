const BASE_URL = 'http://localhost:4000/products'
import axios from 'axios'

export const postProduct = (product) => {
  return axios.post(BASE_URL, product)
}