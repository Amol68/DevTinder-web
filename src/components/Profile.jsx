/* eslint-disable no-unused-vars */

// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";



const Profile = () => {
   const user = useSelector(state=>state.user)

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [gender, setGender] = useState("");
    const [age, setAge] = useState(null);
    const [about, setAbout] = useState();
    const [photoUrl, setPhotourl] = useState();

     const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();


    const handleEdit = async () => {
    try {
      const res = await axios.patch(
        baseUrl + "/edit",
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
      navigate("/feed");
      
    } catch (err) {
      setError(err);
    }
  };


  
     useEffect(() => {
      if (user) {
        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setGender(user.gender || "");
        setAge(user.age ||null);
        setAbout(user.about || "");
        setPhotourl(user.photoUrl || "");
      }
    }, [user]);

  return (

   <div className="min-h-screen flex flex-col ">

  {/*  Welcome Header */}
  <div className="px-8 py-4  shadow-sm">
    <h2 className="font-semibold text-2xl ">Welcome, Dean 👋</h2>
    <p className="text-gray-300 text-sm">
      Update your profile to help other developers discover you
    </p>
  </div>

  {/* Main Section */}
  <div className="flex flex-col md:flex-row gap-6 p-8 max-w-4x mx-auto w-full ">

    {/*  Form Section */}
    <div className="flex-1 flex flex-col p-6 rounded-2xl shadow-sm border border-gray-600 gap-y-4">
      {/* firstname */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">First Name</legend>
        <input
          type="text"
          className="input w-full"
          value={firstName}
          placeholder="Type here"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </fieldset>

      {/* lastname */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Last Name</legend>
        <input
          type="text"
          className="input w-full"
          value={lastName}
          placeholder="Type here"
          onChange={(e) => setLastName(e.target.value)}
        />
      </fieldset>

      {/* about */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">About</legend>
        <textarea
          className="textarea w-full"
          value={about}
          placeholder="Type here"
          rows={3}
          onChange={(e) => setAbout(e.target.value)}
        />
      </fieldset>

      {/* gender */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Gender</legend>
        <input
          type="text"
          className="input w-full"
          value={gender}
          placeholder="Type here"
          onChange={(e) => setGender(e.target.value)}
        />
      </fieldset>

      {/* age */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Age</legend>
        <input
          type="number"
          className="input w-full"
          value={age}
          placeholder="Type here"
          onChange={(e) => setAge(e.target.value)}
        />
      </fieldset>

      {/* photo URL */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Photo URL</legend>
        <input
          type="text"
          className="input w-full"
          value={photoUrl}
          placeholder="Type here"
          onChange={(e) => setPhotourl(e.target.value)}
        />
      </fieldset>

      {/* Button */}
      <div className="flex justify-end pt-2">
        <button className="btn btn-secondary" onClick={handleEdit}>
          Save Changes
        </button>
      </div>
    </div>

    {/*  User Card Section */}
    <div className="flex-1 flex justify-center md:justify-start ">
      <UserCard user={{ firstName, lastName, gender, age, about, photoUrl }} isProfile={true} className={"h-fit"}  />
    </div>
  </div>
</div>

  );
};

export default Profile;
