using PhysiquePlanner.Models;

namespace PhysiquePlanner.Api.Repositories.Interfaces
{
    public interface IWorkoutRepository
    {
        Task<ICollection<Workout>> GetAllPublicWorkoutsAsync();
        Task<Workout> GetWorkoutByIdAsync(int workoutId);
        Task<ICollection<Workout>> GetUserWorkoutsAsync(string userId);
        Task<ICollection<Workout>> GetPublicWorkoutByNameAsync(string workoutName);
        Task<Workout> CreateWorkoutAsync(Workout workoutToCreate);
        Task<Workout> UpdateWorkoutAsync(Workout workoutToUpdate);
        Task<bool> WorkoutExistsAsync(int workoutId);
        Task<Workout> DeleteWorkoutAsync(Workout workoutToDelete);
    }
}
