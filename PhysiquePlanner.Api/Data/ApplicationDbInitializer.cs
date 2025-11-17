using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PhysiquePlanner.Api.Data.SeedData;
using PhysiquePlanner.Api.Models;
using PhysiquePlanner.Models;

namespace PhysiquePlanner.Api.Data
{
    public static class ApplicationDbInitializer
    {
        public static void SeedData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole>().HasData(IdentityRoleSeed.Data);
            modelBuilder.Entity<Exercise>().HasData(ExerciseSeed.Data);
            modelBuilder.Entity<Muscle>().HasData(MuscleSeed.Data);
            modelBuilder.Entity<ExerciseMuscle>().HasData(ExerciseMuscleSeed.Data);
            modelBuilder.Entity<ApplicationUser>().HasData(SystemUserSeed.Data);
        }
    }
}
