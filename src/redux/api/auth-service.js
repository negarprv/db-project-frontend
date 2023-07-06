const logout = () => {
  localStorage.removeItem("user");
};

const getCurUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  logout,
  getCurUser,
};

export default authService;
