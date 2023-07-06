import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect, useState } from "react";

//css
import "./App.css";

//service
import authServices from "./redux/api/auth-service";

//components
import Login from "./pages/Login";

const App = () => {
  const [curUser, setCurUser] = useState(undefined);

  useEffect(() => {
    const user = authServices.getCurUser();
    console.log(user);
    if (user) {
      setCurUser(user);
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
