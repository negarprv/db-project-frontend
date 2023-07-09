import { useMutation, useQuery } from "react-query"
import { postCost, getCosts, getSingleCost, putCost, deleteCost, searchCost } from "./requests"

export const useAddNewCost = () => {
  return useMutation(postCost)
}

export const useUpdateCost = () => {
  return useMutation(putCost)
}

export const useDeleteCost = () => {
  return useMutation(deleteCost)
}

export const useGetSingleCost = (id, options = {}) => {
  return useQuery(
    ['costs/getSignle', id],
    () => {
      return getSingleCost(id)
    },
    options
  )
}

export const useGetCosts = (queryObject) => {
  return useQuery('costs/getAll', () => {
    return getCosts(queryObject)
  })
}

export const useSearchCosts = (term) => {
  return useQuery(['costs/search', term], () => {
    return searchCost(term)
  })
}