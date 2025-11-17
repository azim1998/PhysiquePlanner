namespace PhysiquePlanner.Api.Dtos.WorkoutDtos
{
    public class WorkoutCreationDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsPrivate { get; set; }
        public int Duration { get; set; } //Do i need these extra props or make them nullable
        public int Difficulty { get; set; }
        public string WorkoutType { get; set; } = "";
    }
}
