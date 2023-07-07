import { useMutation, useQuery } from "react-query"
import { postUser, getUsers } from "./requests"

export const useAddNewUser = () => {
  return useMutation(postUser)
}


export const useGetUsers = (queryObject) => {
  return useQuery('users/getAll', () => {
    return getUsers(queryObject)
  })
}