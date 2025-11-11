/* eslint-disable no-unused-vars */
import React from "react";
import defaultUser from "../assets/images/defaultUser.jpeg";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { removeUser } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
const UserCard = ({ user,className }) => {
  const {
    firstName = "",
    lastName = "",
    photoUrl,
    about = "",
    _id = "",
    age = null,
    gender = ""
  } = user || {};

  const dispatch = useDispatch();

  const handleRequest = (status, userID) => {
    try {
      const res = axios.post(
        baseUrl + "/request/send/" + status.trim() + "/" + userID,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeUser(_id));
    } catch (err) {
      console.log("handle request error", err);
    }
  };
  

  return (
   <div className={`bg-base-300 border border-gray-600 shadow-sm rounded-2xl p-5 flex flex-col items-center text-center max-w-sm mx-auto ${className}`}>
  {/* Profile Image */}
  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-500 mb-3">
    <img
      src={photoUrl || defaultUser}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Name */}
  <h2 className="text-heading font-semibold text-base">{firstName} {lastName}</h2>

  {/* About */}
  <p className="text-body text-sm mt-2 leading-relaxed px-2">
    {about}
  </p>

  {/* Additional Info */}
  <div className="flex justify-center gap-4 text-xs text-gray mt-3 border border-gray-700 rounded-xl ">
    <span className=" border-r px-1">{age && `${age} Years` }</span>
    <span className="pr-5"> {gender && gender}</span>
  </div>

  {/* Buttons */}
  <div className="flex justify-center gap-3 mt-4 w-full">
    <button
      onClick={() => handleRequest("ignored", _id)}
      className="btn btn-secondary w-28"
    >
      Ignore
    </button>
    <button
      onClick={() => handleRequest("interested", _id)}
      className="btn btn-primary w-28"
    >
      Interested
    </button>
  </div>
</div>

  );
};

export default UserCard;
