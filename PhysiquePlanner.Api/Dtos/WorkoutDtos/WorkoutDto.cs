using PhysiquePlanner.Api.Dtos.WorkoutExerciseDtos;

namespace PhysiquePlanner.Api.Dtos.WorkoutDtos
{
    public class WorkoutDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsPublished { get; set; }
        public int Duration { get; set; }
        public int Difficulty { get; set; }
        public string WorkoutType { get; set; } = "";
        public string Owner { get; set; } = "";
        public ICollection<WorkoutExerciseDto> WorkoutExercises { get; set; }
    }
}
