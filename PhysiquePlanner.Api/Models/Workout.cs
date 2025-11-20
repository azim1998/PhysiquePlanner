using PhysiquePlanner.Api.Models;

namespace PhysiquePlanner.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public string ApplicationUserId { get; set; } = "";
        public int? Duration { get; set; }
        public int Difficulty { get; set; }
        public string WorkoutType { get; set; } = "";
        public bool IsPublished { get; set; } = false;



        public ICollection<WorkoutExercise> WorkoutExercises { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}
