import axios, { AxiosPromise } from "axios";
import { HandleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/Accounts";

const apiUrl = "http://localhost:5195/api/Accounts";

export const RegisterUserAPI = async (
  userName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post<UserProfileToken>(`${apiUrl}/register`, {
      userName,
      email,
      password,
    });
    return response;
  } catch (error) {
    HandleError(error);
  }
};

export const LoginUserAPI = async (userName: string, password: string) => {
  try {
    const response = axios.post<UserProfileToken>(`${apiUrl}/login`, {
      userName,
      password,
    });
    return response;
  } catch (error) {
    HandleError(error);
  }
};
