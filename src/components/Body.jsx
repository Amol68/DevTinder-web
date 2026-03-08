/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const user = await axios.get(baseUrl + "/view", {
        withCredentials: true,
      });

      dispatch(addUser(user.data));
    } catch (err) {
      navigate("/login");
     
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className=" flex flex-col min-h-screen">
      <Navbar />
        <main className="grow">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Body;
