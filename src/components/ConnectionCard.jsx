import React from "react";

import { FiMessageCircle } from "react-icons/fi";

const ConnectionCard = ({
  firstName,
  lastName,
  about,
  age,
  gender,
  photoUrl,
  handleChat
}) => {


  
  return (
    <div
      className="
        relative group flex flex-col sm:flex-row 
        bg-linear-to-br from-[#1f1f1f] to-[#1a1a1a]
        border border-gray-700/60 
        rounded-2xl p-5 
        max-w-xl w-full gap-5
        shadow-md hover:shadow-xl
        hover:-translate-y-0.5 transition-all duration-300
      "
    >
      {/* Chat Icon */}
      <b
        className="
          absolute top-4 right-4 
          p-2 rounded-full 
          bg-gray-800 text-gray-400
          hover:bg-indigo-600 hover:text-white
          transition-all
          opacity-100 sm:opacity-0 group-hover:opacity-100

        "
        title="Chat"
        onClick={handleChat}
      >
        <FiMessageCircle size={18} />
      </b>

      {/* Avatar */}
      <div className="shrink-0 mx-auto sm:mx-0">
        <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-gray-700 group-hover:ring-indigo-500 transition">
          <img
            src={photoUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between text-gray-200 w-full">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            {firstName} {lastName}
          </h3>

          <p className="mt-1 text-sm text-gray-400 line-clamp-3">
            {about || "No bio available"}
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {gender && (
            <span className="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-300">
              {gender}
            </span>
          )}

          {age && (
            <span className="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-300">
              {age} yrs
            </span>
          )}

          <span className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-green-600/15 text-green-400 border border-green-600/30">
            ● Connected
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
