import { useMutation, useQuery } from "react-query"
import { getProducts, getSingleProduct, postProduct } from "./requests"

export const useAddNewProduct = () => {
  return useMutation(postProduct)
}

export const useGetSingleProduct = (id, options = {}) => {
  return useQuery(
    ['costs/getSignle', id],
    () => {
      return getSingleProduct(id)
    },
    options
  )
}

export const useGetProducts = (queryObject) => {
  return useQuery('products/getAll', () => {
    return getProducts(queryObject)
  })
}