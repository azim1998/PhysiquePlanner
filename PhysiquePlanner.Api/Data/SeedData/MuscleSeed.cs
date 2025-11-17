using PhysiquePlanner.Models;

namespace PhysiquePlanner.Api.Data.SeedData
{
    public static class MuscleSeed
    {
        public static readonly Muscle[] Data =
        [
            new Muscle { Id = 1, Name = "Chest", Description = "The pectoral muscles located on the front of the upper body." },
            new Muscle { Id = 2, Name = "Back", Description = "The large group of muscles that support the spine and shoulders." },
            new Muscle { Id = 3, Name = "Shoulders", Description = "The deltoid muscles covering the shoulder joint." },
            new Muscle { Id = 4, Name = "Biceps", Description = "The muscles located on the front of the upper arm." },
            new Muscle { Id = 5, Name = "Triceps", Description = "The muscles on the back of the upper arm." },
            new Muscle { Id = 6, Name = "Quads", Description = "The four-part muscle group on the front of the thigh." },
            new Muscle { Id = 7, Name = "Hamstrings", Description = "The muscles on the back of the thigh." },
            new Muscle { Id = 8, Name = "Calves", Description = "The muscles on the back of the lower leg." },
            new Muscle { Id = 9, Name = "Abs", Description = "The abdominal muscles located on the front of the torso." }
        ];
    }
}
