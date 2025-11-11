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
    <div className="navbar bg-base-300 shadow-sm px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl border">
          dumBle
        </Link>
      </div>
      <div
        className={`  ${Object.keys(user).length === 0 ? "hidden" : "block"}`}
      >
        <div className="dropdown flex  justify-center items-center">
          <div>Welcome {user.firstName || "User"}</div>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-20 rounded-full ">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoUrl || defaultUser}
              />
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box  w-52 mt-40 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
             <li>
              <Link to="/requests">Requests</Link>
            </li>
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
