using PhysiquePlanner.Models;

namespace PhysiquePlanner.Repositories.Interfaces
{
    public interface IExerciseRepository
    {
        Task<ICollection<Exercise>> GetAllExercisesAsync();
        Task<Exercise> GetExerciseByIdAsync(int exerciseId);
        Task<ICollection<Exercise>> GetExercisesByName(string exerciseName);
    }
}
