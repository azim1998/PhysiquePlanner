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

export interface WorkoutUpdateCreationDto {
    name: string
    description: string
    isPrivate: boolean
    workoutExercises: ExerciseSelectionDto[] //Does this need changing to workoutExercises
}

export interface AddExercisesToWorkoutDto {
    exerciseIds: number[]
}

export interface ExerciseSelectionDto {
    exerciseId: number
    sets: number
    reps: number
  }