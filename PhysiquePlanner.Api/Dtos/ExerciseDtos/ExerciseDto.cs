using PhysiquePlanner.Api.Dtos.MuscleDtos;

namespace PhysiquePlanner.Api.Dtos.ExerciseDtos
{
    public class ExerciseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public ICollection<MuscleDto> Muscles { get; set; }

    }
}
