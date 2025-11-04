import React from "react";
import defaultUser from "../assets/images/defaultUser.jpeg";
const UserCard = ({ user }) => {
  console.log("usercard", user);

  const { firstName = "", lastName = "", photoUrl, about = "" } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-sm flex flex-col items-center py-2 justify-center ">
      <figure className="">
        <img src={photoUrl || defaultUser} alt="img" />
      </figure>
      <div className="card-body flex flex-col">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <div className="card-actions flex justify-center gap-x-4">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
