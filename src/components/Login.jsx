/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/constants";
import DividerWithText from "./DividerText";

import { Mail, Lock, TextQuote, Sparkles, Heart, MoonStar } from "lucide-react";
import {
  InfoGlassCard,
  MessageGlassCard,
  ProfileGlassCard,
} from "./GlassCards";
import { Input } from "./inputs/Input";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      const res = await axios.post(
        baseUrl + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res?.data?.data));

      setFormError(res.data);

      if (res?.data?.message === "User Login Successful") navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },

        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full overflow-hidden  max-w-[1200px]   mx-auto    ">
      <div className="flex ">
        {/* login form */}
        <div className="flex flex-col w-full lg:w-[55%]  px-6 sm:px-10 lg:px-16 py-4 ">
          <div className="card card-dash   max-w-[370px]  ">
            <div className="card-body flex flex-col gap-6  ">
              {/* login title */}
              <div className="flex flex-col gap-y-1 ">
                <span className="font-bold text-xl tracking-wide">
                  Welcome Back
                </span>
                <span className=" text-gray-300">
                  {isLogin
                    ? "Sign in to continue your journey"
                    : "Sign Up to start your journey"}
                </span>
              </div>

              <div className="flex flex-col justify-center items-center gap-y-8 ">
                {/* input fields */}
                <div className="flex flex-col justify-start items-center gap-3 w-full">
                  {!isLogin && (
                    <>
                      <Input
                        label={"Firstname"}
                        type={"text"}
                        value={firstName}
                        onChange={setFirstName}
                      />

                      <Input
                        label={"Lastname"}
                        type={"text"}
                        value={lastName}
                        onChange={setLastName}
                      />
                    </>
                  )}

                  {/* email Id */}
                  <Input
                    label={"Email"}
                    type={"email"}
                    value={email}
                    onChange={setEmail}
                  />

                  {/* password */}
                  <Input
                    label={"Password"}
                    type={"text"}
                    value={password}
                    onChange={setPassword}
                  />
                </div>

                {/* login/signup button */}
                <div className="card-actions w-full px-1">
                  <button
                    type="button"
                    onClick={
                      isLogin ? () => handleLogin() : () => handleSignUp()
                    }
                    className="w-full py-3 rounded-full font-semibold text-purple-900 transition-all duration-300
      hover:brightness-110 active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #d8b4fe, #c084fc)",
                      boxShadow:
                        "0 0 24px rgba(192, 132, 252, 0.5), 0 0 48px rgba(192, 132, 252, 0.25)",
                    }}
                  >
                    {isLogin ? "Login →" : "Sign Up →"}
                  </button>
                </div>

                <DividerWithText isLogin={isLogin} />

                <button
                  type="button"
                  onClick={() => setIsLogin((value) => !value)}
                  className="cursor-pointer w-full border  border-gray-500 rounded-lg py-2 hover:btn hover:btn-secondary "
                >
                  {isLogin ? "Sign In" : "Login"}
                </button>

                {/* {formError.length > 0 ? (
              <p className="text-red-600 ">{formError}</p>
            ) : (
              <></>
            )} */}
              </div>
            </div>
          </div>
        </div>

        {/* cards */}
        <div
          className="hidden lg:flex flex-1 flex-col relative  justify-center gap-8"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            backgroundImage: `
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
    `,
            backgroundSize: "40px 40px",
            backdropFilter: "blur(12px)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div className="absolute -top-20 -left-20 w-[200px] bg-primary-foreground h-[200px] opacity-60 blur-3xl" />
          {/* ✅ Purple blob — top left */}
          <div className="absolute -top-10 -left-10 w-[280px] h-[280px] rounded-full bg-primary/20 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-[280px] h-[280px] rounded-full bg-[#c084fc]/20 blur-[80px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 max-w-[250px] rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            {/* Icon */}
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-400/15">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
            </div>

            {/* Text */}
            <span className="text-sm font-semibold tracking-wide text-violet-200">
              48,219 hearts beating
            </span>
          </div>
          <div className="flex flex-col gap-5 w-full max-w-md mx-auto ">
            <ProfileGlassCard
              name="Maya"
              age={27}
              subtitle="Coffee lover · 94% match"
              avatarLabel="M"
              avatarColor="from-purple-400 to-pink-500"
              actionIcon={<Heart />}
              className="w-full self-start animate-float [animation-delay:0s]"
              style={{ animationDelay: "0s" }}
            />

            <MessageGlassCard
              senderLabel="Maya replied"
              message="Pottery + cold brew on Saturday?"
              emoji="🌸"
              className="w-[90%] self-end animate-float-slow [animation-delay:0.4s]"
              style={{ animationDelay: "0.4s" }}
            />

            {/* Card 3 — slightly left of center */}
            <InfoGlassCard
              icon={<MoonStar />}
              title="3 new matches today"
              subtitle="curated just for you"
              className="w-[95%] self-start  animate-float-late [animation-delay:0.8s]"
              style={{ animationDelay: "0.8s" }}
            />
          </div>
          <div className=" flex justify-center flex-col  items-center p-2">
            <div className="font-bold text-lg">Real Connections.</div>
            <div className="text-sm">No Endless Swiping </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
