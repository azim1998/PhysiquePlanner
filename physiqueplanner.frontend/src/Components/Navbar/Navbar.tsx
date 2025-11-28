import { Link } from "react-router-dom";
import logo from "../../Assets/weightlifting_icon.png";
import { useAuth } from "../../Context/AuthContext";
import { Button } from "@mantine/core";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, logoutUser } = useAuth();

  return (
    <div className="w-full border-b border-gray-600">
      <div className="flex items-center justify-center py-4 mx-auto pt-4 sm:max-w-[700px] md:max-w-[1000px]">
        <Link to="/home">
          <img src={logo} alt="logo" className="h-10 border-r pr-10" />
        </Link>

        <Link to={"/exercises"}>
        <Button className="mx-3" variant="subtle" radius="md" color="black" size="md">
            Exercises
          </Button>
        </Link>

        <Link to={"/workouts"}>
          <Button variant="subtle" radius="md" color="black" size="md">
            Workouts
          </Button>
        </Link>

        {isLoggedIn() ? (
          <Button
            className="ml-auto"
            radius="md"
            variant="subtle"
            color="black"
            size="md"
            onClick={logoutUser}
          >
            Logout
          </Button>
        ) : (
          <Link className="ml-auto" 
            to={"/login"}
          >
            <Button variant="subtle" radius="md" color="black" size="md">
            Login
          </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
("");
