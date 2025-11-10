using PhysiquePlanner.Api.Dtos.WorkoutDtos;
using PhysiquePlanner.Api.Models.Results;
using PhysiquePlanner.Models;

namespace PhysiquePlanner.Api.Services.Interfaces
{
    public interface IWorkoutService
    {
        Task<Result<ICollection<Workout>>> GetAllPublicWorkoutsAsync();
        Task<Result<ICollection<Workout>>> GetPublicWorkoutByNameAsync(string workoutName);
        Task<Result<ICollection<Workout>>> GetUserWorkoutsByNameAsync(string workoutName, string userId);
        Task<Result<ICollection<Workout>>> GetUserWorkoutsAsync(string userId);
        Task<Result<Workout>> GetWorkoutByIdAsync(int workoutId);
        Task<Result<Workout>> CreateWorkoutAsync(WorkoutCreationDto workoutCreationDto, string userId);
        Task<Result<Workout>> ShareWorkoutAsync(int workoutId);
        Task<Result<Workout>> CloneWorkoutAsync(int workoutId, string userId);
        Task<Result<Workout>> UpdateWorkoutAsync(int workoutId, WorkoutUpdateDto workoutUpdateDto);
        Task<Result<Workout>> PartiallyUpdateWorkoutAsync(int workoutId, WorkoutUpdateDto workoutUpdateDto);
        Task<Result<Workout>> AddExercisesToWorkoutAsync(int workoutId, AddExercisesToWorkoutDto exerciseids);
        Task<Result<object>> DeleteWorkoutAsync(int workoutId);
        Task<Result<Workout>> RemoveExerciseFromWorkoutAsync(int workoutId, int exerciseId);
    }
}
