namespace PhysiquePlanner.Api.Dtos.WorkoutExerciseDtos
{
    public class WorkoutExerciseDto
    {
        public int WorkoutId { get; set; } //Maybe get rid?
        public int ExerciseId { get; set; }
        public string ExerciseName { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
    }
}
