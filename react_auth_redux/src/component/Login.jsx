import { useState , useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch , useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Link } from "react-router-dom";
export default function Login() {
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user)
   const navigate = useNavigate();
  useEffect(() => {
    if(user){
     // navigate("/room")
    }
  }, [user])
  const create = async(data) => {
    console.log("here" , data)
    setError("")
    try {
      const userData =  await authService.login(data);
        console.log('working');
        if (userData) {
            
           const userData = await authService.getCurrentUser()
           console.log(userData)
            if(userData) dispatch(login(userData));
            console.log("user");
            
            console.log("navigate")

         navigate("/room")
        }
    } catch (error) {
        setError(error.message);
    }
}
  return (<div> 
    <h1>{user?.name} Login</h1>
    <h2>aready have an account ?  <buttom><Link to ="/signup">Signup</Link></buttom></h2>
     <form onSubmit={handleSubmit((data)=>create(data))}>
      
  <input type="text" {...register("name")} placeholder="First name" />
  <input type ="Email" {...register("email")} placeholder="Email" />
  <input type="text" {...register("password")} placeholder="Password" />

  <input type="submit" />
</form>
</div>
   
  );
}