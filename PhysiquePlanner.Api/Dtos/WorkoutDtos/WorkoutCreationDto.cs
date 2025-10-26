namespace PhysiquePlanner.Api.Dtos.WorkoutDtos
{
    public class WorkoutCreationDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsPrivate { get; set; }
        public IList<ExerciseSelectionDto> WorkoutExercises { get; set; }
    }
}
