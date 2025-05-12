using PhysiquePlanner.Api.Dtos.WorkoutDtos;
using PhysiquePlanner.Models;

namespace PhysiquePlanner.Api.Services.Interfaces
{
    public interface IWorkoutService
    {
        Task<Workout> CreateWorkoutAsync(WorkoutCreationDto workoutCreationDto, string userId);
        Task<Workout?> UpdateWorkoutAsync(int workoutId, WorkoutUpdateDto workoutUpdateDto);
    }
}
