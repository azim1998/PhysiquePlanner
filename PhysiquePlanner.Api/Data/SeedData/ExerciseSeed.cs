using PhysiquePlanner.Models;

namespace PhysiquePlanner.Api.Data.SeedData
{
    public static class ExerciseSeed
    {
        public static readonly Exercise[] Data =
        [
        new Exercise { Id = 1, Name = "Bench Press", Description = "A compound movement to strengthen the chest, shoulders, and triceps." },
            new Exercise { Id = 2, Name = "Pull-Up", Description = "A bodyweight exercise to develop the back and biceps." },
            new Exercise { Id = 3, Name = "Squat", Description = "A fundamental lower-body exercise targeting quads, hamstrings, and glutes." },
            new Exercise { Id = 4, Name = "Deadlift", Description = "A compound exercise to develop the posterior chain including back, glutes, and hamstrings." },
            new Exercise { Id = 5, Name = "Overhead Press", Description = "A shoulder press exercise that strengthens the deltoids and triceps." },
            new Exercise { Id = 6, Name = "Barbell Curl", Description = "An isolation exercise for the biceps." },
            new Exercise { Id = 7, Name = "Skull Crushers", Description = "An isolation triceps exercise performed with a barbell or dumbbells." },
            new Exercise { Id = 8, Name = "Leg Press", Description = "A lower-body exercise targeting the quads and glutes." },
            new Exercise { Id = 9, Name = "Calf Raise", Description = "A focused movement to develop the calves." }
    ];
    }

}
