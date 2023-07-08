import { useMutation } from "react-query"
import { postProduct } from "./requests"

export const useAddNewProduct = () => {
  return useMutation(postProduct)
}
