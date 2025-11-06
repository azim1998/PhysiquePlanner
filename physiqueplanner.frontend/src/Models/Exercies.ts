export interface Exercise {
  id: number;
  name: string;
  description: string;
  muscles: Muscle[]
}

export interface Muscle {
  id: number;
  name: string;
  description: string;
}

