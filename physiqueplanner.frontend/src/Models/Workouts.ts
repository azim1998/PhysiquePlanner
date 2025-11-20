import { ApplicationUser } from "./Accounts"
import { WorkoutExercise } from "./WorkoutExercise"

export interface Workout {
    id: number
    name: string
    description: string
    applicationUserId: string
    duration: number
    difficulty: number
    workoutType: string
    owner: string
    isPublished: boolean
    workoutExercises: WorkoutExercise[]
}

export interface WorkoutCreationDto {
    name: string
    description: string
    duration?: number
    difficulty?: number
    workoutType?: string
}

export interface WorkoutUpdateDto {
    name?: string
    description?: string 
    duration?: number
    difficulty?: number
    workoutType?: string
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