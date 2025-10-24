import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((store) => store.user);
 
  return (
    <div className="navbar bg-base-300 shadow-sm px-6">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl border">dumBle</a>
      </div>
      <div
        className={`  ${
          Object.keys(user).length === 0 ? "hidden" : "block"
        }`}
      >
        <div className="dropdown flex  justify-center items-center">
          <div>Welcome {user.firstName}</div>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar ml-4"
          >
            <div className="w-20 rounded-full ">
              <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
