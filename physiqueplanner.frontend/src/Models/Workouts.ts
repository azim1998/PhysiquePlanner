import { ApplicationUser } from "./Accounts"
import { ExerciseSelectionDto } from "./Exercies"
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
    exerciseSelection: ExerciseSelectionDto[]
}

export interface AddExercisesToWorkoutDto {
    exerciseIds: number[]
}