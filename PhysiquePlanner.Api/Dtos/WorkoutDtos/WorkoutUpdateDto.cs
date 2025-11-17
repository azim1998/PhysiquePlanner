namespace PhysiquePlanner.Api.Dtos.WorkoutDtos
{
    public class WorkoutUpdateDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? IsPrivate { get; set; }
        public int? Duration { get; set; }
        public int? Difficulty { get; set; }
        public string? WorkoutType { get; set; }
        public IList<ExerciseSelectionDto> WorkoutExercises { get; set; } = new List<ExerciseSelectionDto>();
    }
}
