import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
const AdminRoute = ({ children })=>{
    const { userInfo } = useSelector((store)=> store.auth);
    return (
        userInfo?.isAdmin ? children : <Navigate to='/login'/>
    )
}

export default AdminRoute;