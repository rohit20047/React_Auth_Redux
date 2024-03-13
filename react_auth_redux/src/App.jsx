import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { login } from "./redux/authSlice";
//import { SignUp } from "./component";
import { useDispatch , useSelector } from "react-redux";
import { SignUp } from "./component";
import { Login } from "./component";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
 import  PrivateRoutes  from "./PrivateRoutes";


import Room from "./pages/Room"
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
function App() {
  
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user);
  return (
    <>
  {/* <button onClick = {() => dispatch( login("hello") )}>Login</button>
  {user} */}

    <Router>
      <Routes>
        <Route path = "/" element = {<LoginPage/>} />
        <Route path="/signup" element={<SignInPage/>}/>
        <Route element={<PrivateRoutes />}>
              <Route path="/room" element={<Room/>}/>
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
