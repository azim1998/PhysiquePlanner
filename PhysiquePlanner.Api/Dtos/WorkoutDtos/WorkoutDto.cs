using PhysiquePlanner.Api.Dtos.WorkoutExerciseDtos;

namespace PhysiquePlanner.Api.Dtos.WorkoutDtos
{
    public class WorkoutDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsPrivate { get; set; }
        public ICollection<WorkoutExerciseDto> WorkoutExercises { get; set; }
    }
}
