import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [load, setLoad] = useState(true);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const signup = () => {
    const e = email;
    const p = password;
    signInWithEmailAndPassword(auth, e, p)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast("Signed In")
        setTimeout(function(){navigate("/")}, 2000);
        
      })
      .catch((error) => {
        toast("Wrong Email or Password")
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("password didnt matched");
      });
  };
  const changeemail = (e) => {
    setEmail(e.target.value);
    setLoad(!load);
  };
  const changepassword = (e) => {
    setPassword(e.target.value);
    setLoad(!load);
  };

  return (
    <div className="min-h-screen bg-[#02062a]   py-4 ">
      <div className="lg:flex  sm:block lg:px-40  sm:px-5">
        <div className="w-2/3  mx-auto ">
        <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
          <h1 className="text-white text-xl font-semibold">
            <img
              src="./LogoDashMasjid.png"
              alt=""
              className="inline-block w-[50px]"
            />
            <Link to={'/'}>
            DASHMASJID
            </Link>
          </h1>
          <div className="justify-center text-white  mt-40">
            <h1 className="text-3xl font-bold">Welcome, to DashMasjid</h1>
            <h1 className="my-2 font-bold mb-10 mt-3">
              Please enter your details
            </h1>

            <label htmlFor="email" className="text-[10px] font-bold">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              onChange={changeemail}
              value={email}
              placeholder="Email Adresss"
              className="text-black block my-3 sm:w-full lg:w-1/2 rounded-3xl px-3 py-2 bg-gray-200 border-none"
              id=""
            />
            <label htmlFor="email" className="text-[10px] font-bold">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              onChange={changepassword}
              value={password}
              placeholder="Password"
              className="text-black block my-3 sm:w-full lg:w-1/2 rounded-3xl px-3 py-2 bg-gray-200 border-none"
              id=""
            />
            <button
              onClick={signup}
              className="lg:w-1/2 sm:w-full my-4 py-2 bg-black backdrop-blur-2xl bg-opacity-30 border-[1px] rounded-xl">
              Sign in
            </button>
            <h2 className="text-gray-300 text-center lg:w-1/2 sm:w-full">
              Don't have an account? 
              <Link className="text-white font-bold" to={"/signup"}>
                Sign up for free
              </Link>
            </h2>
            <h2 className="text-gray-300 text-center lg:w-1/2 sm:w-full">
              <Link className="text-white font-bold" to={"/forgot-password"}>
                Forgot Password??
              </Link>
            </h2>
          </div>
        </div>

        <div className="mx-auto lg:w-1/2 sm:w-0 ">
          <img src="./LogoDashMasjid.png" className="lg:w-full py-20 sm:w-0" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
