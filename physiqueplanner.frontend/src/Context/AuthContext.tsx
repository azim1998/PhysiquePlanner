import { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/Accounts";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  LoginUserAPI,
  RegisterUserAPI,
} from "../Services/AccountsService";
import { toast } from "react-toastify";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  loginUser: (userName: string, password: string) => void;
  registerUser: (userName: string, email: string, password: string) => void;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    setIsReady(true);
  }, []);

  const registerUser = async (
    userName: string,
    email: string,
    password: string
  ) => {
    await RegisterUserAPI(userName, email, password)
      .then((response) => {
        if (response?.data) {
          const userObj = {
            userName: response.data.userName,
            email: response.data.email,
          };
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);

          localStorage.setItem("user", JSON.stringify(userObj));
          setUser(userObj);

          toast.success("User Successfully Registered!");
          navigate("/exercises");
        }
      })
      .catch((e) => toast.warning("Server error has occured"));
  };

  const loginUser = async (userName: string, password: string) => {
    await LoginUserAPI(userName, password)
      .then((response) => {
        if (response?.data) {
          const userObj = {
            userName: response.data.userName,
            email: response.data.email,
          };

          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);

          localStorage.setItem("user", JSON.stringify(userObj));
          setUser(userObj);

          toast.success("User Successfully Logged in!");
          navigate("/exercises");
        }
      })
      .catch((e) => toast.warning("Server error has occured"));
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);

    toast.success("User Successfully Logged Out")

    navigate("/home");
  };

  const isLoggedIn = () => {
    return !!user
  }

  return (
    <AuthContext.Provider value={{user, token, registerUser, loginUser, logoutUser, isLoggedIn}}>
        {isReady ? children : null}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);