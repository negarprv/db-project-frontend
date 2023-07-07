import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from '../hooks/useAuth'

export const ProtectedRoute = () => {
  const { stateVal } = useAuth()
  return stateVal.authenticated ? <Outlet /> : <Navigate to="/" />
}
