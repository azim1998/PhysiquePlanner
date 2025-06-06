using Microsoft.EntityFrameworkCore;
using PhysiquePlanner.Data;
using PhysiquePlanner.Models;
using PhysiquePlanner.Repositories.Interfaces;

namespace PhysiquePlanner.Repositories
{
    public class ExerciseRepository : IExerciseRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public ExerciseRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<ICollection<Exercise>> GetAllExercisesAsync()
        {
            return await _applicationDbContext.Exercises.Include(e => e.ExerciseMuscles).ThenInclude(em => em.Muscle).ToListAsync();
        }

        public async Task<Exercise> GetExerciseByIdAsync(int exerciseId)
        {
            var exercise = await _applicationDbContext.Exercises
                .Include(e => e.ExerciseMuscles)
                .ThenInclude(em => em.Muscle)
                .FirstOrDefaultAsync(e => e.Id == exerciseId);

            return exercise;

        }

        public async Task<ICollection<Exercise>> GetExercisesByName(string exerciseName)
        {
            return await _applicationDbContext.Exercises.Where(e => e.Name.Contains(exerciseName)).ToListAsync();
        }
    }
}
