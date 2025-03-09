//Here we import Outlet and Navigate from react-router-dom. 
// Outlet is a component that renders the child route's component. Navigate is a component that allows us to navigate to a different route.  
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux' //Here we are importing the useSelector hook from react-redux. We will use this to access the state of the store.


const PrivateRoute = () => {
  //Here we are calling the userInfo from the auth slice. The destructured object will contain the user information.
  const { userInfo } = useSelector((state) => state.auth) 
  //Here we are checking if the userInfo exists. If the userInfo exists, we will render the Outlet component. If the userInfo does not exist, we will render the Navigate component and redirect the user to the login page. The replace prop will replace the current entry in the history stack with the new location.
  return (
    userInfo ? <Outlet /> : <Navigate to='/login' replace />
  )
}

export default PrivateRoute