import { Link } from "react-router-dom";
import logo from "../../Assets/weightlifting_icon.png";
import { useAuth } from "../../Context/AuthContext";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, logoutUser } = useAuth();

  return (
    <div className="h-15 px-20 justify-center items-center border-b border-gray-600 flex items-center py-4">
      <img src={logo} alt="logo" className="h-10 border-r pr-10" />
      <Link
        className="text-gray-600 text-center w-25 ml-10 border-2 rounded-lg px-3 py-1.25 transition-all duration-300 hover:bg-gradient-to-r from-slate-900 to-slate-700 hover:text-white"
        to={"/home"}
      >
        Home
      </Link>
      <Link
        className="text-gray-600 text-center w-25 mx-3 border-2 rounded-lg px-3 py-1.25 transition-all duration-300 hover:bg-gradient-to-r from-slate-900 to-slate-700 hover:text-white"
        to={"/exercises"}
      >
        Exercises
      </Link>
      <Link 
        className="text-gray-600 text-center w-25 border-2 rounded-lg px-3 py-1.25 transition-all duration-300 hover:bg-gradient-to-r from-slate-900 to-slate-700 hover:text-white"
        to={"/workouts"}
      >
        Workouts
      </Link>
      {isLoggedIn() ? (
        <button
          className="text-white text-center w-25 ml-auto border-2 rounded-lg px-3 py-1.25 bg-gradient-to-r from-slate-900 to-slate-700 transition duration-300 hover:text-black "
          onClick={logoutUser}
        >
          Logout
        </button>
      ) : (
        <Link
          className="text-white text-center w-25 ml-auto border-2 rounded-lg px-3 py-1.25 bg-gradient-to-r from-slate-900 to-slate-700 transition duration-300 hover:text-black "
          to={"/login"}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
("");
