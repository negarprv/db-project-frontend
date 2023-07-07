import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { login, isLoggedIn, logOut } from '../redux/auth'

export const useAuth = () => {
  const stateVal = useAppSelector((state) => state.auth)
  const appDispatch = useAppDispatch()
  const dispatchLogin = (crudentials) => appDispatch(login(crudentials))
  const dispatchGetUserData = () => appDispatch(isLoggedIn())
  const dispatchLogOut = () => appDispatch(logOut())

  return { stateVal, dispatchLogin, dispatchGetUserData, dispatchLogOut }
}

