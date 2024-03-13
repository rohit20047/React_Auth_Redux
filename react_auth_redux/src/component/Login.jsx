import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
export default function Login() {
  const { register, handleSubmit, formState } = useForm();
  const { isValid, isDirty , isSubmitting } = formState;
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const navigate = useNavigate();

  const create = async (data) => {
    console.log("here", data);
    setError("");
    try {
      const userData = await authService.login(data);
      console.log("working");
      if (userData) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) dispatch(login(userData));
        console.log("user");

        console.log("navigate");

        navigate("/room");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        {/* <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div> */}
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Atleast 8 characters"
              {...register("password", {
                required: true,
              })}
            />
            <button
              type="submit"
              className={`w-full px-4 py-2 rounded-lg ${
                !isValid || !isDirty || isSubmitting ? "bg-blue-400" : "bg-blue-600"
              } text-white`}
              disabled={!isValid || !isDirty || isSubmitting}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
