/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/constants";
import DividerWithText from "./DividerText";

import { Mail,Lock,TextQuote } from 'lucide-react';

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log({ formError });
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.data));

      setFormError(res.data);

      if (res?.data?.message === "User Login Successful") navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.data));
      navigate("/profile")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-2  px-5">


      <div className="card card-dash bg-base-300 w-96 h-auto  ">
        <div className="card-body flex flex-col gap-6 ">


          {/* login title */}
          <div className="flex flex-col gap-y-1 ">
            <span className="font-bold text-xl tracking-wide">Welcome Back</span>
           <span className=" text-gray-300">{isLogin ? "Sign in to continue your journey" : "Sign Up to start your journey"}</span> 
          </div>

          <div className="flex flex-col justify-center items-center gap-y-8 ">

          {/* input fields */}
          <div className="flex flex-col justify-start items-center gap-y-1 w-full">
                {!isLogin && (
              <>
                <div className="w-full">
                  <fieldset className="fieldset">
                    <label className="flex gap-1 items-center pl-1">
                   <TextQuote size={15}/>
                   <span>FirstName</span>
                </label>
               
                    <input
                      type="text"
                      className="input outline-0"
                      value={firstName}
                      placeholder="Type here"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </fieldset>
                </div>

                <div className="w-full">
                  <fieldset className="fieldset">
                   <label className="flex gap-1 items-center pl-1">
                   <TextQuote size={15}/>
                   <span>LastName</span>
                </label> <input
                      type="text"
                      className="input outline-0"
                      value={lastName}
                      placeholder="Type here"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </fieldset>
                </div>
              </>
            )}

            {/* email Id */}
            <div className=" w-full">
              <fieldset className="fieldset">
                <label className="flex gap-1 items-center pl-1">
                   <Mail size={15}/>
                   <span>Email</span>
                </label>
                <input
                  type="email"
                  className="input  outline-0"
                  value={email}
                  placeholder="Type here"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
            </div>

            {/* password */}
            <div className="w-full">
              <fieldset className="fieldset">
                 <label className="flex gap-1 items-center pl-1">
                   <Lock size={15}/>
                   <span>Password</span>
                </label> <input
                  type="text"
                  className="input outline-0"
                  value={password}
                  placeholder="Type here"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </fieldset>
            </div>

          </div>


   {/* login/signup button */}
            <div className="card-actions w-full px-1">
              <button
                className="btn btn-secondary  border w-full"
                onClick={isLogin ? handleLogin : handleSignUp}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </div>
           
           <DividerWithText isLogin={isLogin}/>

            <button
              onClick={() => setIsLogin((value) => !value)}
              className="cursor-pointer w-full border  border-gray-500 rounded-lg py-2 hover:btn hover:btn-secondary "
            >
          {isLogin?"Sign In":"Login"}
            </button>

            {/* {formError.length > 0 ? (
              <p className="text-red-600 ">{formError}</p>
            ) : (
              <></>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
