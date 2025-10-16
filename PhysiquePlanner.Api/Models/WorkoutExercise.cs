namespace PhysiquePlanner.Models
{
    public class WorkoutExercise
    {
        public int WorkoutId { get; set; }
        public Workout Workout { get; set; }

        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }

        public int Sets { get; set; } = 0;
        public int Reps { get; set; } = 0;
    }
}
