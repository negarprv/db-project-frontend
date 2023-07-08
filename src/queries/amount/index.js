import { useMutation, useQuery } from "react-query";
import { postCostAmount, getCostsAmount } from "./requests";

export const useAddNewCostAmount = () => {
  return useMutation(postCostAmount);
};

export const useGetCostsAmount = (id,queryObject) => {
  return useQuery("costs/amount/getAll", () => {
    return getCostsAmount(id,queryObject);
  });
};
