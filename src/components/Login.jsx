import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log({ formError });
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log({ res });
      dispatch(addUser(res?.data?.data));

      setFormError(res.data);

      if (res?.data?.message === "User Login Successful") navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center my-5">
      <div className="card card-dash bg-base-300 w-96 ">
        <div className="card-body ">
          <h2 className="card-title justify-center">Login</h2>

          <div className="flex flex-col justify-center items-center gap-y-3 ">
            {/* email Id */}
            <div className=" w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input
                  type="email"
                  className="input "
                  value={email}
                  placeholder="Type here"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
            </div>

            {/* password */}
            <div className="w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="text"
                  className="input"
                  value={password}
                  placeholder="Type here"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </fieldset>
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-secondary" onClick={handleLogin}>
                Login
              </button>
            </div>
            {formError.length > 0 ? (
              <p className="text-red-600 ">{formError}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
