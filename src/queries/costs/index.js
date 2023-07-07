import { useMutation, useQuery } from "react-query"
import { postCost, getCosts, getSingleCost } from "./requests"

export const useAddNewCost = () => {
  return useMutation(postCost)
}

export const useGetSingleCost = (id) => {
  return useQuery(['costs/getSignle', id], () => {
    return getSingleCost(id)
  })
}

export const useGetCosts = (queryObject) => {
  return useQuery('costs/getAll', () => {
    return getCosts(queryObject)
  })
}