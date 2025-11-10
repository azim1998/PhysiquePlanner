import axios, { AxiosPromise } from "axios";
import { HandleError } from "../Helpers/ErrorHandler";
import { Exercise } from "../Models/Exercies";
import { Result } from "../Models/Result"

const apiUrl = "http://localhost:5195/api/Exercises";

export const GetAllExercisesAPI = async () => {
  try {
    const response = await axios.get<Result<Exercise[]>>(apiUrl);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

export const GetExerciseByIdAPI = async (exerciseId: string) => {
  try {
    const response = await axios.get<Result<Exercise>>(`${apiUrl}/${exerciseId}`);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

export const GetExercisesByNameAPI = async (exerciseName: string) => {
  try {
    const response = await axios.get<Result<Exercise[]>>(`${apiUrl}/${exerciseName}`);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};
