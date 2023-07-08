const BASE_URL = "http://localhost:4000/costs/amount";
import axios from "axios";

export const postCostAmount = (costAmount) => {
  const { unit_price, costId } = costAmount;
  return axios.post(BASE_URL + `/${costId}`, {
    unit_price,
  });
};

export const getCostsAmount = async (
  id,
  { per_page, page, sort_order, sort_by } = {
    per_page: 20,
    page: 1,
    sort_order: "DESC",
    sort_by: "created_at",
  }
) => {
  return (
    await axios.get(
      BASE_URL +
        `/${id}` +
        `?per_page=${per_page}&page=${page}&sort_order=${sort_order}&sort_by=${sort_by}`
    )
  ).data;
};
