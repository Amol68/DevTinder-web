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
import { LocateFixed, MapPin } from "lucide-react";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(null);
  const [about, setAbout] = useState();
  const [photoUrl, setPhotourl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({
    city: "",
    state: "",
    country: "",
  });

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
          ...location,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data));
      navigate("/feed");
    } catch (err) {
      setError(err);
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          );

          const data = await res.json();

          setLocation({
            city:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "",
            state: data.address.state || "",
            country: data.address.country || "",
          });
        } catch (err) {
          console.log(err);
        }

        setIsLoading(false);
      },
      () => {
        alert("Unable to fetch location");
        setIsLoading(false);
      },
    );
  };

  const updateLocation = (key, value) => {
    setLocation((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setGender(user.gender || "");
      setAge(user.age || null);
      setAbout(user.about || "");
      setPhotourl(user.photoUrl || "");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col ">
      {/*  Welcome Header */}
      <div className="px-8 py-4  shadow-sm">
        <h2 className="font-semibold text-2xl ">{`Welcome ${user.firstName ?? ""} 👋`}</h2>
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

          {/* location section */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
              {/* Left Section */}
              <div className="flex items-center gap-2 w-full md:w-auto md:flex-1">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0" />

                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                  Add Your Location
                </h2>
              </div>

              {/* Right Section */}
              <button
                onClick={detectLocation}
                className="
      w-full md:w-auto
      flex items-center justify-center gap-2
      px-4 py-3
      rounded-xl
      bg-blue-500 hover:bg-blue-600
      transition
      text-sm sm:text-base md:text-sm
      text-white font-medium
      whitespace-nowrap
    "
              >
                <LocateFixed className="w-4 h-4 shrink-0" />
                {isLoading ? "Detecting..." : "Use Current Location"}
              </button>
            </div>

            {/* city */}
            <div className="w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">City</legend>
                <input
                  type="text"
                  className="input w-full"
                  value={location.city}
                  placeholder="Type here"
                  onChange={(e) => {
                    updateLocation("city", e.target.value);
                  }}
                />
              </fieldset>
            </div>

            {/* state */}
            <div className="w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">State</legend>
                <input
                  type="text"
                  className="input w-full"
                  value={location.state}
                  placeholder="Type here"
                  onChange={(e) => {
                    updateLocation("state", e.target.value);
                  }}
                />
              </fieldset>
            </div>

            {/* country */}
            <div className="w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Country</legend>
                <input
                  type="text"
                  className="input w-full"
                  value={location.country}
                  placeholder="Type here"
                  onChange={(e) => {
                    updateLocation("country", e.target.value);
                  }}
                />
              </fieldset>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end pt-2">
            <button className="btn btn-secondary" onClick={handleEdit}>
              Save Changes
            </button>
          </div>
        </div>

        {/*  User Card Section */}
        <div className="flex-1 flex justify-center md:justify-start ">
          <UserCard
            user={{ firstName, lastName, gender, age, about, photoUrl }}
            isProfile={true}
            className={"h-fit"}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
