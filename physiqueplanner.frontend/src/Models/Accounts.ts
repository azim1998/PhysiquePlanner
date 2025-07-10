import { Workout } from "./Workouts"

export interface UserProfileToken {
    userName: string
    email: string
    token: string
}

export interface UserProfile {
    userName: string
    email: string
}

export interface ApplicationUser {
    id: string
    userName: string
    email: string
    workouts: Workout[]
}