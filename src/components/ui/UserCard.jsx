/* eslint-disable no-unused-vars */
import React from "react";
import defaultUser from "../../assets/images/defaultUser.jpeg"
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { removeUser } from "../../utils/feedSlice";
import { useDispatch } from "react-redux";
const UserCard = ({ user, className, isProfile }) => {
  const {
    firstName = "",
    lastName = "",
    photoUrl,
    about = "",
    _id = "",
    age = null,
    gender = "",
    skills = [],
    location = {},
  } = user || {};

 console.log({user})

  const dispatch = useDispatch();

  const handleRequest = (status, userID) => {
    try {
      const res = axios.post(
        baseUrl + "/send/" + status.trim() + "/" + userID,
        {},
        { withCredentials: true },
      );
      console.log(res);
      dispatch(removeUser(_id));
    } catch (err) {
      console.log("handle request error", err);
    }
  };
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`;
  return (
    <div className="relative max-w-sm mx-auto rounded-3xl  h-fit p-px bg-linear-to-br from-purple-500/40 via-pink-500/30 to-blue-500/30">
      {/* Inner Card */}
      <div className="rounded-3xl bg-[#0f1117] p-6 text-center text-white relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.25),transparent_40%)] pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-center text-xs text-gray-400 mb-6">
          <span className="tracking-widest">DUMBLE - DEV</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span>online</span>
          </div>
        </div>

        {/* Avatar */}
        <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-3xl font-bold text-black shadow-lg mb-4">
          {initials}
        </div>

        {/* Name */}
        <h2 className="text-lg font-semibold">
          {firstName} {lastName}
        </h2>

        {/* Pronouns
       <p className="text-sm text-gray-400 mt-1">{g}</p> */}

        {/* Role */}
        {/* <p className="text-sm text-gray-300 mt-2 flex items-center justify-center gap-2">
          💼 {role}
        </p> */}

        {/* About */}
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed px-2">
          "{about}"
        </p>

        {/* age and location */}

        <div
          className={`flex gap-1  text-muted-foreground text-xs ${age && gender && location?.city && location?.country ? "flex" : "hidden"}`}
        >
          <div className="flex-1 border border-border rounded-2xl bg-input  p-1 px-2">{`${age} ${gender}`}</div>
          <div className="flex-1 flex bg-input rounded-2xl whitespace-nowrap p-1 px-2">{`${location?.city} ${location?.country}`}</div>
        </div>

        {/* Pills Section */}
        {/* <div className="mt-5 flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300">
              📍 {location}
            </div>
            <div className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300">
              🐙 {github}
            </div>
          </div>

          <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 text-left">
            ☕ {coffee}
          </div>
        </div> */}

        {/* Stack */}
        <div className={`mt-6 text-left ${skills.length ? "block" : "hidden"}`}>
          <p className="text-xs text-gray-500 mb-2 tracking-widest">STACK</p>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-400/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-6 border-t border-white/10 pt-3 flex justify-between text-xs text-gray-500">
          <span>Profile preview</span>
          <span className="text-purple-400">100%</span>
        </div> */}
      </div>
    </div>
  );
};

export default UserCard;
