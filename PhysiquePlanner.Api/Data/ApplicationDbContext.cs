using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PhysiquePlanner.Api.Data;
using PhysiquePlanner.Api.Models;
using PhysiquePlanner.Models;

namespace PhysiquePlanner.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<WorkoutExercise> WorkoutExercise { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ExerciseMuscle>(x => x.HasKey(em => new { em.ExerciseId, em.MuscleId }));
            builder.Entity<ExerciseMuscle>()
                .HasOne(em => em.Exercise)
                .WithMany(e => e.ExerciseMuscles)
                .HasForeignKey(em => em.ExerciseId);
            builder.Entity<ExerciseMuscle>()
                .HasOne(em => em.Muscle)
                .WithMany(m => m.ExerciseMuscles)
                .HasForeignKey(em => em.MuscleId);

            builder.Entity<WorkoutExercise>(x => x.HasKey(we => new { we.WorkoutId, we.ExerciseId }));
            builder.Entity<WorkoutExercise>()
                .HasOne(we => we.Workout)
                .WithMany(w => w.WorkoutExercises)
                .HasForeignKey(we => we.WorkoutId);
            builder.Entity<WorkoutExercise>()
                .HasOne(we => we.Exercise)
                .WithMany(e => e.WorkoutExercises)
                .HasForeignKey(we => we.ExerciseId);

            builder.Entity<Workout>()
                .HasOne(w => w.ApplicationUser)
                .WithMany(au => au.Workouts)
                .HasForeignKey(w => w.ApplicationUserId);

            base.OnModelCreating(builder);
            ApplicationDbInitializer.SeedData(builder);
        }
    }
}
