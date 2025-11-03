using PhysiquePlanner.Api.Dtos.WorkoutDtos;
using PhysiquePlanner.Models;

namespace PhysiquePlanner.Api.Services.Interfaces
{
    public interface IWorkoutService
    {
        Task<Workout> CreateWorkoutAsync(WorkoutCreationDto workoutCreationDto, string userId);
        Task<Workout?> UpdateWorkoutAsync(int workoutId, WorkoutUpdateDto workoutUpdateDto);
        Task<Workout?> PartiallyUpdateWorkoutAsync(int workoutId, WorkoutUpdateDto workoutUpdateDto);
        Task<Workout?> AddExercisesToWorkoutAsync(int workoutId, AddExercisesToWorkoutDto exerciseids);
        Task<Workout?> RemoveExerciseFromWorkoutAsync(int workoutId, int exerciseId);
    }
}
