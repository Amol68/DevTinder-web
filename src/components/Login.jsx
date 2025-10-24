/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        baseUrl+"/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("response", res?.data?.data);

      dispatch(addUser(res?.data?.data));

      navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center my-5">
      <div className="card card-dash bg-base-300 w-96 ">
        <div className="card-body ">
          <h2 className="card-title justify-center">Login</h2>

          {/* email Id */}
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                value={email}
                placeholder="Type here"
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
          </div>

          {/* password */}
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                placeholder="Type here"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-secondary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
