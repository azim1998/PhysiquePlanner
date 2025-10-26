import axios from "axios";
import {
  AddExercisesToWorkoutDto,
  Workout,
  WorkoutUpdateCreationDto,
} from "../Models/Workouts";
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

export const GetWorkoutAPI = async (id: string) => {
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

export const GetPublicWorkoutsByNameAPI = async (workoutName: string) => {
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
    console.log(workoutId, data);
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

export const AddExercisesToWorkoutApi = async (
  workoutId: string,
  exerciseIds: AddExercisesToWorkoutDto
) => {
  try {
    const response = axios.post(
      `${apiUrl}/${workoutId}/exercises`,
      exerciseIds
    );
    return response;
  } catch (error) {
    HandleError(error);
  }
};

export const RemoveExerciseFromWorkoutAPI = async (
  workoutId: string,
  exerciseId: string
) => {
  try {
    const response = axios.delete(
      `${apiUrl}/${workoutId}/exercises/${exerciseId}`
    );
    return response;
  } catch (error) {
    HandleError(error);
  }
};
