using PhysiquePlanner.Api.Models.Results;
using PhysiquePlanner.Api.Services.Interfaces;
using PhysiquePlanner.Models;
using PhysiquePlanner.Repositories.Interfaces;

namespace PhysiquePlanner.Api.Services
{
    public class ExerciseService : IExerciseService
    {
        private readonly IExerciseRepository _exerciseRepository;

        public ExerciseService(IExerciseRepository exerciseRepository)
        {
            _exerciseRepository = exerciseRepository;
        }
        public async Task<Result<ICollection<Exercise>>> GetAllExercisesAsync()
        {
            try
            {
                var exercises = await _exerciseRepository.GetAllExercisesAsync();
                return Result<ICollection<Exercise>>.Ok(exercises);
            }
            catch (Exception ex)
            {
                return Result<ICollection<Exercise>>.Fail("Failed to get exercies, please try again");
            }

        }


        public async Task<Result<Exercise>> GetExerciseByIdAsync(int exerciseId)
        {
            try
            {
                var exercise = await _exerciseRepository.GetExerciseByIdAsync(exerciseId);
                return Result<Exercise>.Ok(exercise);
            }
            catch (Exception ex)
            {
                return Result<Exercise>.Fail("Failed to get exercise, please try again");
            }
        }

        public async Task<Result<ICollection<Exercise>>> GetExerciseByNameAsync(string name)
        {
            try
            {
                var exercise = await _exerciseRepository.GetExercisesByName(name);
                return Result<ICollection<Exercise>>.Ok(exercise);
            }
            catch (Exception ex)
            {
                return Result<ICollection<Exercise>>.Fail("Failed to get exercise, please try again");
            }
        }
    }
}
