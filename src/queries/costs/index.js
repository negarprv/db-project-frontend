import { useMutation, useQuery } from "react-query"
import { postCost, getCosts } from "./requests"

export const useAddNewCost = () => {
  return useMutation(postCost)
}


export const useGetCosts = (queryObject) => {
  return useQuery('costs/getAll', () => {
    return getCosts(queryObject)
  })
}