import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PrivateRoutes = () => {
    
    const user = useSelector((state) => state.auth.user);
    console.log(user);
    return user ? <Outlet/> : <Navigate to = "/"/>
}

export default PrivateRoutes