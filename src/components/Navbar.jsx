import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { deleteFeed } from "../utils/feedSlice";
import defaultUser from "../assets/images/defaultUser.jpeg";
const Navbar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post(baseUrl + "/logout", {}, { withCredentials: true });

      dispatch(removeUser());
      dispatch(deleteFeed());

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="sticky top-0 z-50  flex items-center justify-between bg-white/5 backdrop-blur-md px-6 py-3 bg-white rounded-xl"
      style={
        {
          // background: "rgba(15, 10, 26, 0.75)",
          // backdropFilter: "blur(20px)",
          // borderBottom: "1px solid rgba(255,255,255,0.08)",
          // boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }
      }
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 no-underline group">
        <div
          className="w-6 h-6 md:w-8 md:h-8 rounded-xl flex items-center justify-center font-black text-white text-sm"
          style={{
            background: "linear-gradient(135deg, #a855f7, #ec4899)",
            boxShadow: "0 0 16px rgba(168,85,247,0.45)",
          }}
        >
          d
        </div>
        <span className="text-white font-bold text-md md:text-lg tracking-tight">
          dumBle
        </span>
      </Link>

      {/* Right — logged in only */}
      <div
        className={
          Object.keys(user)?.length === 0 || !user
            ? "hidden"
            : "flex items-center gap-3"
        }
      >
        {/* Welcome */}
        <span className="text-white/50 text-sm hidden sm:block">
          Hey,{" "}
          <span className="text-white/80 font-medium">
            {user.firstName || "User"}
          </span>
        </span>

        {/* Avatar + Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="cursor-pointer rounded-full p-0.5"
            style={{
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.5), rgba(236,72,153,0.5))",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <img
              src={user.photoUrl || defaultUser}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover block"
            />
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content mt-3 w-52 p-1.5 rounded-2xl"
            style={{
              background: "rgba(26, 16, 37, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            }}
          >
            {/* User pill */}
            <li className="px-3 py-2.5 mb-1 border-b border-white/8">
              <p className="text-white font-semibold text-sm">
                {user.firstName || "User"}
              </p>
              <p className="text-white/40 text-xs mt-0.5 truncate">
                {user.email || ""}
              </p>
            </li>

            {[
              { to: "/profile", label: "Profile", badge: "New" },
              { to: "/connections", label: "Connections" },
              { to: "/requests", label: "Requests" },
              { to: "/premium", label: "✦ Premium", gold: true },
            ].map(({ to, label, badge, gold }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`
                flex items-center justify-between px-3 py-2 rounded-xl text-sm
                transition-colors duration-150 no-underline
                ${
                  gold
                    ? "text-amber-300 hover:bg-amber-500/10"
                    : "text-white/65 hover:text-white hover:bg-white/6"
                }
              `}
                >
                  {label}
                  {badge && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(168,85,247,0.2)",
                        color: "#c084fc",
                        border: "1px solid rgba(168,85,247,0.3)",
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}

            {/* Logout */}
            <li className="border-t border-white/8 mt-1 pt-1">
              <button
                onClick={handleLogOut}
                className="w-full text-left px-3 py-2 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/8 transition-colors duration-150"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
