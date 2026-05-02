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
import { CodeXml, LocateFixed, MapPin, User, UserStar } from "lucide-react";
import FormTitle from "./ui/FormTitle";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(null);
  const [about, setAbout] = useState();
  const [photoUrl, setPhotourl] = useState();
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
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

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed) return;
    if (!skills.includes(trimmed)) {
      setSkills((prev) => {
        return [...prev, trimmed];
      });
    }
    setSkillInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
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
        <div className="flex-1 flex flex-col p-6 rounded-2xl shadow-sm bg-card border border-gray-600 gap-y-6">
          {/* SECTION: Identity */}
          <FormTitle icon={<User className="w-4 h-4" />} title="Identity" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input w-full"
                value={firstName || ""}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            {/* Last Name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input w-full"
                value={lastName || ""}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            {/* Gender */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                className="input w-full"
                value={gender || ""}
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>

            {/* Age */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                className="input w-full"
                value={age || ""}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
          </div>

          {/* About - Full Width */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea
              className="textarea w-full"
              rows={3}
              value={about || ""}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>

          {/* Photo URL */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              className="input w-full"
              value={photoUrl || ""}
              onChange={(e) => setPhotourl(e.target.value)}
            />
          </fieldset>

          {/* SECTION: Skills */}
          <FormTitle icon={<CodeXml className="w-4 h-4" />} title="Skills" />

          <fieldset className="rounded-xl p-1">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                className="input w-full"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Type a skill"
                onKeyDown={handleKeyDown}
              />

              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl bg-primary-foreground text-white"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-blue-400 hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </fieldset>

          {/* SECTION: Location */}
          <>
          <div className="flex">

            <FormTitle icon={<MapPin className="w-4 h-4" />} title="Location" />

            <div className="flex flex-col md:flex-row md:items-center gap-1">
              <button
                onClick={detectLocation}
                className="w-full md:w-auto px-4 py-2 rounded-xl bg-primary-foreground  text-white"
              >
                {isLoading ? "Detecting..." : "Use Current Location"}
              </button>
            </div>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* City */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">City</legend>
                <input
                  type="text"
                  className="input w-full"
                  value={location.city || ""}
                  onChange={(e) => updateLocation("city", e.target.value)}
                />
              </fieldset>

              {/* State */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">State</legend>
                <input
                  type="text"
                  className="input w-full"
                  value={location.state || ""}
                  onChange={(e) => updateLocation("state", e.target.value)}
                />
              </fieldset>

              {/* Country */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Country</legend>
                <input
                  type="text"
                  className="input w-full"
                  value={location.country || ""}
                  onChange={(e) => updateLocation("country", e.target.value)}
                />
              </fieldset>
            </div>
          </>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button className="btn btn-secondary px-6" onClick={handleEdit}>
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
