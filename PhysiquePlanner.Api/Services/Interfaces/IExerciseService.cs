using PhysiquePlanner.Api.Models.Results;
using PhysiquePlanner.Models;

namespace PhysiquePlanner.Api.Services.Interfaces
{
    public interface IExerciseService
    {
        Task<Result<ICollection<Exercise>>> GetAllExercisesAsync();
        Task<Result<Exercise>> GetExerciseByIdAsync(int exerciseId);
        Task<Result<ICollection<Exercise>>> GetExerciseByNameAsync(string name);
    }
}
