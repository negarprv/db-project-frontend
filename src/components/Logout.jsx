import authServices from "../services/auth-service";

const Logout = () => {
  const logOut = () => {
    authServices.logout();
  };
  return (
    <div>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Logout;
