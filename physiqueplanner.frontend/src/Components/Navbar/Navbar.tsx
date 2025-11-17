import { Link } from "react-router-dom";
import logo from "../../Assets/weightlifting_icon.png";
import { useAuth } from "../../Context/AuthContext";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, logoutUser } = useAuth();

  return (
<div className="w-full border-b border-gray-600">
    <div className="flex items-center justify-center py-4 mx-auto pt-4 sm:max-w-[700px] md:max-w-[1000px]">
      <Link to="/home">
        <img src={logo} alt="logo" className="h-10 border-r pr-10" />
      </Link>

      <Link
        className="text-gray-600 mx-3 border-2 rounded-lg px-3 py-1.25 transition-all duration-300 hover:bg-gradient-to-r from-slate-900 to-slate-700 hover:text-white"
        to={"/exercises"}
      >
        Exercises
      </Link>

      <Link
        className="text-gray-600 border-2 rounded-lg px-3 py-1.25 transition-all duration-300 hover:bg-gradient-to-r from-slate-900 to-slate-700 hover:text-white"
        to={"/workouts"}
      >
        Workouts
      </Link>

      {isLoggedIn() ? (
        <button
          className="text-white ml-auto border-2 rounded-lg px-3 py-1.25 bg-gradient-to-r from-slate-900 to-slate-700 transition duration-300 hover:text-black"
          onClick={logoutUser}
        >
          Logout
        </button>
      ) : (
        <Link
          className="text-white ml-auto border-2 rounded-lg px-3 py-1.25 bg-gradient-to-r from-slate-900 to-slate-700 transition duration-300 hover:text-black"
          to={"/login"}
        >
          Login
        </Link>
      )}
    </div>
  </div>
  );
};

export default Navbar;
("");
