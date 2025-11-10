import axios from "axios";
import {
  AddExercisesToWorkoutDto,
  Workout,
  WorkoutCreationDto,
  WorkoutUpdateDto,
} from "../Models/Workouts";
import { HandleError } from "../Helpers/ErrorHandler";
import {Result} from "../Models/Result"

const apiUrl = "http://localhost:5195/api/Workouts";

export const GetAllPublicWorkoutsAPI = async () => {
  try {
    const response = await axios.get<Result<Workout[]>>(`${apiUrl}/`);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

export const GetUserWorkoutsAPI = async () => {
  try {
    const response = await axios.get<Result<Workout[]>>(`${apiUrl}/userWorkouts`);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

export const GetUserWorkoutsByNameAPI = async (workoutName: string) => {
  try {
    const response = await axios.get<Result<Workout[]>>(`${apiUrl}/userWorkouts/${workoutName}`);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

export const GetWorkoutAPI = async (id: string) => {
  try {
    const response = await axios.get<Result<Workout>>(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

export const CreateWorkoutAPI = async (data: WorkoutCreationDto) => {
  try {
    const response = await axios.post<Result<Workout>>(`${apiUrl}`, data); //Do I need to type this to createdataction?
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

export const ShareWorkoutAPI = async (id: string) => {
  try {
    const response = await axios.post<Result<Workout>>(`${apiUrl}/${id}/share`);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
}

export const SaveWorkoutAPI = async (id: string) => {
  try {
    const response = await axios.post<Result<Workout>>(`${apiUrl}/${id}/save`);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

export const GetPublicWorkoutsByNameAPI = async (workoutName: string) => {
  try {
    const response = await axios.get<Result<Workout[]>>(`${apiUrl}/${workoutName}`);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

export const PartiallyUpdateWorkoutAPI = async (
  workoutId: string,
  data: WorkoutUpdateDto
) => {
  try {
    const response = await axios.patch<Result<Workout>>(`${apiUrl}/${workoutId}`, data);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

export const DeleteWorkoutAPI = async (workoutId: string) => {
  try {
    const response = await axios.delete<Result<object>>(`${apiUrl}/${workoutId}`);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

export const AddExercisesToWorkoutApi = async (
  workoutId: string,
  exerciseIds: AddExercisesToWorkoutDto
) => {
  try {
    const response = await axios.post<Result<Workout[]>>(
      `${apiUrl}/${workoutId}/exercises`,
      exerciseIds
    );
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

export const RemoveExerciseFromWorkoutAPI = async (
  workoutId: string,
  exerciseId: string
) => {
  try {
    const response = await axios.delete<Result<Workout[]>>(
      `${apiUrl}/${workoutId}/exercises/${exerciseId}`
    );
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};
