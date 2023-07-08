export default {
  ADMIN: 1,
  SALES: 2,
  PURCHASING: 3
}

export const getRoleName = (roleCode) => {
  const roles = ["ادمین", "مسئول فروش", "مسئول خرید"]
  return roles[roleCode - 1]
}