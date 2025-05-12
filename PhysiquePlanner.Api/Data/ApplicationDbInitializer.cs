using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PhysiquePlanner.Models;

namespace PhysiquePlanner.Api.Data
{
    public class ApplicationDbInitializer
    {
        private readonly ModelBuilder modelBuilder;
        public ApplicationDbInitializer(ModelBuilder modelBuilder)
        {
            this.modelBuilder = modelBuilder;
        }

        public void SeedData()
        {
            modelBuilder.Entity<IdentityRole>().HasData(roles);
            modelBuilder.Entity<Exercise>().HasData(exercises);
            modelBuilder.Entity<Muscle>().HasData(muscles);
            modelBuilder.Entity<ExerciseMuscle>().HasData(exerciseMuscles);
        }


        private readonly List<IdentityRole> roles = new List<IdentityRole>
        {
            new IdentityRole
                        {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole
            {
                Name = "User",
                NormalizedName = "USER"
            }
        };

        private readonly List<Exercise> exercises = new List<Exercise>
        {
            new Exercise
            {
                Id = 1,
                Name = "Bench Press",
                Description = "Bench Press"
            },
            new Exercise
            {
                Id = 2,
                Name = "Squat",
                Description = "Squat"
            },
            new Exercise
            {
                Id = 3,
                Name = "Deadlift",
                Description = "Deadlift"
            }
        };

        private readonly List<Muscle> muscles = new List<Muscle>
        {
            new Muscle
            {
                Id = 1,
                Name = "Chest",
                Description = "Chest"
            },
            new Muscle
            {
                Id = 2,
                Name = "Legs",
                Description = "Legs"
            },
            new Muscle
            {
                Id = 3,
                Name = "Back",
                Description = "Back"
            }
        };

        private readonly List<ExerciseMuscle> exerciseMuscles = new List<ExerciseMuscle>()
        {
            new ExerciseMuscle
            {
                ExerciseId = 1,
                MuscleId = 1
            },
            new ExerciseMuscle
            {
                ExerciseId = 2,
                MuscleId = 2
            },
            new ExerciseMuscle
            {
                ExerciseId = 3,
                MuscleId = 3
            }
        };

    }
}
