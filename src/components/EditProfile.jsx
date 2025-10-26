/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  console.log({ user });
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(null);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotourl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  console.log({ error });
  const dispatch = useDispatch();
  const handleEdit = async () => {
    try {
      const res = await axios.patch(
        baseUrl + "/profile/edit",
        {
          firstName,
          lastName,
          gender,
          age,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className=" flex flex-col lg:flex-row   justify-center items-center gap-x-5 sm:gap-y-5 md:gap-y-5 my-5 p-5 py-8">
      <div className="card card-dash bg-base-300 w-96  ">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>

          <div className="flex flex-col justify-center items-center gap-y-3 ">
            {/* firstname */}
            <div className=" w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input "
                  value={firstName}
                  placeholder="Type here"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
            </div>

            {/* lastname */}
            <div className="w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  placeholder="Type here"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </div>

            {/* about */}
            <div className="w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input"
                  value={about}
                  placeholder="Type here"
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                />
              </fieldset>
            </div>

            {/* gender*/}
            <div className="w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  className="input"
                  value={gender}
                  placeholder="Type here"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </fieldset>
            </div>

            {/* age */}
            <div className="w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  placeholder="Type here"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </fieldset>
            </div>

            {/* photo url */}
            <div className="w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  placeholder="Type here"
                  onChange={(e) => {
                    setPhotourl(e.target.value);
                  }}
                />
              </fieldset>
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-secondary" onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, gender, age, about, photoUrl }} />
    </div>
  );
};

export default EditProfile;
