import axios, { AxiosPromise } from "axios";
import { HandleError } from "../../Helpers/ErrorHandler";
import { Exercise } from "./Exercies";

const apiUrl = "http://localhost:5195/api/Exercises";

export const GetAllExercisesAPI = async () => {
  try {
    const response = await axios.get<Exercise[]>(apiUrl);
    console.log(response.data)
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

export const GetExercisesByNameAPI = async (exerciseName: string) => {
  try {
    const response = await axios.get<Exercise[]>(`${apiUrl}/${exerciseName}`);
    console.log(`${apiUrl}/${exerciseName}`)
    console.log(response.data)
    return response
  } catch (error) {
    HandleError(error);
  }
}