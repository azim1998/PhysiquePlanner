import { ApplicationUser } from "./Accounts"
import { WorkoutExercise } from "./WorkoutExercise"

export interface Workout {
    id: number
    name: string
    description: string
    applicationUserId: string
    isPrivate: boolean
    workoutExercises: WorkoutExercise[]
    applicationUser: ApplicationUser
}

export interface WorkoutCreationDto {
    name: string
    description: string
    isPrivate: boolean
}

export interface WorkoutUpdateDto {
    name?: string
    description?: string 
    isPrivate?: boolean
    workoutExercises?: ExerciseSelectionDto[]
}

export interface AddExercisesToWorkoutDto {
    exerciseIds: number[]
}

export interface ExerciseSelectionDto {
    exerciseId: number
    sets: number
    reps: number
  }