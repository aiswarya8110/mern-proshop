import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children })=>{
    const { userInfo } = useSelector((store)=> store.auth);

    return userInfo ? children : <Navigate to='/login'/>
}

export default PrivateRoute;