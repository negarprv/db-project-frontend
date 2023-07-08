import { useMutation, useQuery } from "react-query"
import { getProducts, postProduct } from "./requests"

export const useAddNewProduct = () => {
  return useMutation(postProduct)
}


export const useGetProducts = (queryObject) => {
  return useQuery('products/getAll', () => {
    return getProducts(queryObject)
  })
}