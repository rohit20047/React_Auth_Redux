import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { logout } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
function Room() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(logout())
        navigate("/signup")
    }

  
  return (
    <div>
      <h1> Welcom to Room Component<span className="text-red-600 font-bold"> {user.name}</span> </h1>
      <button className= " w-full px-4 py-2 rounded-lg bg-blue-600 text-white " onClick = {() => (handleClick()) }>Logout</button>
    </div>
  )
}

export default Room
