namespace PhysiquePlanner.Api.Dtos.WorkoutDtos
{
    public class WorkoutCreationDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public int Difficulty { get; set; }
        public string WorkoutType { get; set; } = "";
    }
}
