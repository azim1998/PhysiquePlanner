export interface Exercise {
  id: number;
  name: string;
  description: string;
  muscles: Muscle[]
}

export interface Muscle {
  name: string;
  description: string;
}

export interface ExerciseSelectionDto {
  exerciseId: number
  sets: number
  reps: number
}