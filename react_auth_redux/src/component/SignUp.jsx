import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch , useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Link } from "react-router-dom";
export default function SignUp() {
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const navigate = useNavigate();

  if(user){
   navigate("/room")
  }
   //const navigate = useNavigate();

  const create = async(data) => {
    console.log("here" , data)
    setError("")
    try {
      const userData = await authService.createAccount(data);
        console.log('working');
        if (userData) {
            
           const userData = await authService.getCurrentUser()
           console.log(userData)
            if(userData) dispatch(login(userData));
            console.log(user)
             navigate("/room")
        }
    } catch (error) {
        setError(error.message);
    }
}
  return ( <div>
    <h1>Sign up{user?.name}</h1> 
    <h2>aready have an account ? <buttom><Link to ="/">Login</Link></buttom></h2>
    <form onSubmit={handleSubmit((data)=>create(data))}>
      
      <input type="text" {...register("name")} placeholder="First name" />
      <input type ="Email" {...register("email")} placeholder="Email" />
      <input type="text" {...register("password")} placeholder="Password" />
  
      <input type="submit" />
    </form>
    </div>
  );
}