import axios, { AxiosPromise } from "axios";
import { HandleError } from "../../Helpers/ErrorHandler";
import { Exercise } from "./Exercies";

const apiUrl = "http://localhost:5195/api/Exercises";

export const GetAllExercisesAPI = async () => {
  try {
    const response = await axios.get<Exercise[]>(apiUrl);
    return response;
  } catch (error) {
    HandleError(error);
  }
};

export const GetExerciseByIdAPI = async (exerciseId: string) => {
  try {
    const response = await axios.get<Exercise>(`${apiUrl}/${exerciseId}`);
    return response;
  } catch (error) {
    HandleError(error);
  }
};
