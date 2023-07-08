import { useMutation, useQuery } from "react-query";
import {
  postCostAmount,
  getCostsAmount,
  getSingleCostAmount,
  putCostAmount,
} from "./requests";

export const useAddNewCostAmount = () => {
  return useMutation(postCostAmount);
};

export const useGetCostsAmount = (id, queryObject) => {
  return useQuery("costs/amount/getAll", () => {
    return getCostsAmount(id, queryObject);
  });
};

export const useGetSingleCostAmount = (id, options = {}) => {
  return useQuery(
    ["costs/amount/getSignle", id],
    () => {
      return getSingleCostAmount(id);
    },
    options
  );
};

export const useUpdateCostAmount = () => {
  return useMutation(putCostAmount);
};
