import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from './redux/authSlice'
import { useNavigate } from 'react-router-dom'
function Room() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(logout())
        navigate("/signup")
    }

  
  return (
    <div>
      <h1>Room</h1>
      <button onClick = {() => (handleClick()) }>Logout</button>
    </div>
  )
}

export default Room
