import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch , useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Link } from "react-router-dom";
import Input from "./Input";
export default function SignUp() {
  const { register, handleSubmit  , formState} = useForm();
  const { isValid, isDirty , isSubmitting } = formState;
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
    console.log("here" )
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
  return (
    <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5'>
                <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("name", {
                    required: true,
                })}
                />
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="create new Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,})}
                />
                <button type="submit" className={`w-full px-4 py-2 rounded-lg ${
                !isValid || !isDirty || isSubmitting ? "bg-blue-400" : "bg-blue-600"
              } text-white`} disabled={!isValid || !isDirty || isSubmitting}>
                    Create Account
                </button>
            </div>
        </form>
    </div>

</div>
  );
}