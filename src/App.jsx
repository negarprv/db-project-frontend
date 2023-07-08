import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from './components/ProtectedRoute'
import { PanelPage } from './pages/Panel'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
//css
import "./App.css";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';


//components
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

const App = () => {
  const { stateVal, dispatchGetUserData } = useAuth()
  
  axios.defaults.withCredentials = true
  useEffect(() => {
    dispatchGetUserData()
  }, [])
  
  if(stateVal.initial_load){
    return null
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/panel/*' element={<PanelPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-left"
      />
    </>

  );
};

export default App;
