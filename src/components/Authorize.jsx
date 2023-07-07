import { useAuth } from '../hooks/useAuth'


const Authorize= ({ roles, children }) => {
  const { stateVal } = useAuth()
  if (stateVal.user) {
    if (roles.includes(stateVal.user.role)) {
      return (<>{children}</>)
    } else {
      return null
    }
  } else {
    return null
  }
}


export default Authorize