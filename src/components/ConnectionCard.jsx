import React from "react";

const ConnectionCard = ({ firstName, lastName, about, age, gender, photoUrl }) => {
  return (
    <div
      className="
      flex flex-col sm:flex-row 
      border border-gray-600 bg-[#1f1f1f] 
      rounded-2xl shadow-lg p-4 sm:p-5 
      max-w-xl w-full gap-4
      hover:bg-[#242424] transition-all duration-200
    "
    >
      {/* Profile Pic */}
      <div className="w-full sm:w-28 h-36 rounded-xl overflow-hidden shadow-md mx-auto sm:mx-0">
        <img
          src={photoUrl}
          alt="Profile"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col text-gray-200 w-full">
        <h3 className="text-lg font-semibold mb-1">
          {firstName} {lastName}
        </h3>

        <p className="text-sm text-gray-400 leading-5">{about}</p>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {gender && (
            <span className="px-3 py-1 rounded-full text-xs bg-gray-700 text-gray-300">
              {gender}
            </span>
          )}

          {age && (
            <span className="px-3 py-1 rounded-full text-xs bg-gray-700 text-gray-300">
              {age} Years
            </span>
          )}

          <span className="px-3 py-1 rounded-full text-xs bg-gray-700 text-gray-300">
            Connected
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
