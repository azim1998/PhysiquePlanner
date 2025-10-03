import axios from "axios";
import { Workout, WorkoutUpdateCreationDto } from "../Models/Workouts";
import { HandleError } from "../Helpers/ErrorHandler";

const apiUrl = "http://localhost:5195/api/Workouts";

export const GetAllPublicWorkoutsAPI = async () => {
  try {
    const response = await axios.get<Workout[]>(`${apiUrl}/`);
    return response;
  } catch (error) {
    HandleError(error);
  }
};

export const GetUserWorkoutsAPI = async () => {
  try {
    const response = await axios.get<Workout[]>(`${apiUrl}/userWorkouts`);
    return response;
  } catch (error) {
    HandleError(error);
  }
};

export const GetWorkoutAPI = async (id: number) => {
  try {
    const response = await axios.get<Workout>(`${apiUrl}/${id}`);
    return response;
  } catch (error) {
    HandleError(error);
  }
};

export const CreateWorkoutAPI = async (data: WorkoutUpdateCreationDto) => {
  try {
    const response = await axios.post(`${apiUrl}`, data); //Do I need to type this to createdataction?
    return response;
  } catch (error) {
    HandleError(error);
  }
};

export const GetWorkoutsByNameAPI = async (workoutName: string) => {
  try {
    const response = axios.get<Workout[]>(`${apiUrl}/${workoutName}`);
    return response;
  } catch (error) {
    HandleError(error);
  }
};

export const UpdateWorkoutAPI = async (
  workoutId: string,
  data: WorkoutUpdateCreationDto
) => {
  try {
    const response = await axios.put(`${apiUrl}/${workoutId}`, data);
    return response;
  } catch (error) {
    HandleError(error);
  }
};

export const DeleteWorkoutAPI = async (workoutId: string) => {
  try {
    const response = axios.delete(`${apiUrl}/${workoutId}`);
    return response;
  } catch (error) {
    HandleError(error);
  }
};
