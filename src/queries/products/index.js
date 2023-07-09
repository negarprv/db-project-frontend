import { useMutation, useQuery } from "react-query"
import { getProducts, getSingleProduct, postProduct, postProductCost, putProduct,getProductCosts } from "./requests"

export const useAddNewProduct = () => {
  return useMutation(postProduct)
}

export const useAddNewProductCost = () => {
  return useMutation(postProductCost)
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

export const useUpdateProduct = () => {
  return useMutation(putProduct)
}

export const useGetProducts = (queryObject) => {
  return useQuery('products/getAll', () => {
    return getProducts(queryObject)
  })
}

export const useGetProductCosts = (id, options = {}) => {
  return useQuery(
    ['products/costs', id],
    () => {
      return getProductCosts(id)
    },
    options
  )
}