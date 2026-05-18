/* eslint-disable no-unused-vars */

// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditProfile from "../../components/ui/EditProfile";
import axios from "axios";
import { baseUrl } from "../../utils/constants"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice"
import UserCard from  "../../components/ui/UserCard"
import { CodeXml, LocateFixed, MapPin, User, UserStar } from "lucide-react";
import FormTitle from "../../components/ui/FormTitle"
import { Input } from  "../../components/inputs/Input"

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

  console.log({ skillInput });

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
    console.log({ trimmed });
    if (!trimmed) return;
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

  console.log(skills);

  return (
    <div className="min-h-screen flex flex-col p-4 ">
      <div className="absolute -top-10 -left-10 w-[280px] h-[280px] rounded-full bg-primary/20 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-[280px] h-[280px] rounded-full bg-[#c084fc]/20 blur-[80px] pointer-events-none" />

      {/*  Welcome Header */}
      <div className="px-8 py-4  shadow-sm">
        <h2 className="font-semibold text-2xl ">{`Welcome ${user.firstName ?? ""} 👋`}</h2>
        <p className="text-gray-300 text-sm">
          Update your profile to help other developers discover you
        </p>
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row gap-6 p-8 max-w-4x mx-auto w-full  grid md:grid-cols-2">
        {/*  Form Section */}
        <div className="flex-1 flex flex-col p-6 rounded-2xl shadow-sm bg-card border border-gray-600 gap-y-6">
          {/* SECTION: Identity */}
          <FormTitle icon={<User className="w-4 h-4" />} title="Identity" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <Input
              label={"Firstname"}
              type={"text"}
              value={firstName}
              onChange={setFirstName}
            />

            {/* Last Name */}
            <Input
              label={"Lastname"}
              type={"text"}
              value={lastName}
              onChange={setLastName}
            />

            {/* Gender */}
            <Input
              label={"Gender"}
              type={"text"}
              value={gender}
              onChange={setGender}
            />

            {/* Age */}
            <Input
              label={"Age"}
              type={"number"}
              value={age}
              onChange={setAge}
            />

            {/* Photo URL */}
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
          <Input
            label={"Photo URL"}
            type={"text"}
            value={photoUrl || ""}
            onChange={setPhotourl}
          />

          {/* SECTION: Skills */}
          <div className="flex flex-col gap-3">
            <FormTitle icon={<CodeXml className="w-4 h-4" />} title="Stack" />

            <div className="flex items-end gap-2 ">
              <div className="flex-1">
                <Input
                  label="Skills"
                  type="text"
                  value={skillInput}
                  onChange={setSkillInput}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <button
                type="button"
                onClick={handleAddSkill}
                className="h-9 px-4 rounded-xl text-xs font-medium bg-primary-foreground text-ring flex-shrink-0 hover:opacity-90 transition-opacity"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 m">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-2 text-violet bg-primary/10 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-primary/50 hover:text-red-400 text-[10px]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: Location */}
          <div className="flex flex-col gap-4">
            {/* Title + Detect button */}
            <div className="flex items-center gap-2 justify-start">
              <FormTitle
                icon={<MapPin className="w-4 h-4" />}
                title="Location"
              />
              <button
                onClick={detectLocation}
                className="px-4 py-2 text-xs font-medium cursor-pointer text-ring rounded-xl bg-primary-foreground  flex-shrink-0 hover:opacity-90 transition-opacity"
              >
                {isLoading ? "Detecting..." : "Use Current Location"}
              </button>
            </div>

            {/* City / State / Country */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                type="text"
                value={location.city || ""}
                onChange={(e) => {
                  alert("")
                  updateLocation("city", e.target.value);
                }}
              />
              <Input
                label="State"
                type="text"
                value={location.state || ""}
                onChange={(e) => updateLocation("state", e.target.value)}
              />
              <Input
                label="Country"
                type="text"
                value={location.country || ""}
                onChange={(e) => updateLocation("country", e.target.value)}
              />
            </div>

            {/* Save */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleEdit}
                className="px-6 py-2 rounded-xl text-sm font-medium bg-primary-foreground text-white hover:opacity-90 transition-opacity"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-pink), var(--color-violet))",
                  boxShadow:
                    "0 0 20px color-mix(in oklch, var(--color-pink) 35%, transparent), 0 0 40px color-mix(in oklch, var(--color-violet) 20%, transparent)",
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/*  User Card Section */}
        <div className="flex-1 flex justify-center md:justify-start  ">
          <UserCard
            user={{
              firstName,
              lastName,
              gender,
              age,
              about,
              photoUrl,
              skills,
              location,
            }}
            isProfile={true}
            className={"h-fit"}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
