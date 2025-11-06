using Microsoft.EntityFrameworkCore;
using PhysiquePlanner.Api.Constants;
using PhysiquePlanner.Api.Repositories.Interfaces;
using PhysiquePlanner.Data;
using PhysiquePlanner.Models;

namespace PhysiquePlanner.Api.Repositories
{
    public class WorkoutRepository : IWorkoutRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public WorkoutRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Workout> CreateWorkoutAsync(Workout workoutToCreate)
        {
            _applicationDbContext.Workouts.Add(workoutToCreate);
            await _applicationDbContext.SaveChangesAsync();
            return workoutToCreate;
        }

        public async Task<bool> WorkoutExistsAsync(int workoutId)
        {
            return await _applicationDbContext.Workouts.AnyAsync(w => w.Id == workoutId);
        }

        public async Task<ICollection<Workout>> GetAllPublicWorkoutsAsync()
        {
            return await _applicationDbContext.Workouts
                //.Where(w => w.IsPrivate == false)
                .Where(w => w.ApplicationUserId == SystemUser.Id)
                .Include(w => w.WorkoutExercises)
                .ThenInclude(we => we.Exercise)
                .ToListAsync();
        }

        public async Task<ICollection<Workout>> GetPublicWorkoutByNameAsync(string workoutName)
        {
            return await _applicationDbContext.Workouts.Where(w => w.ApplicationUserId == SystemUser.Id && w.Name.Contains(workoutName))
                //.Where(w => w.Name.Contains(workoutName) && w.IsPrivate == false)
                .Include(w => w.WorkoutExercises)
                .ThenInclude(we => we.Exercise)
                .ToListAsync();
        }

        public async Task<ICollection<Workout>> GetUserWorkoutsAsync(string userId)
        {
            return await _applicationDbContext.Workouts.Where(w => w.ApplicationUserId == userId)
                .Include(w => w.WorkoutExercises)
                .ThenInclude(we => we.Exercise)
                .ToListAsync();
        }

        public async Task<Workout> GetWorkoutByIdAsync(int workoutId)
        {
            return await _applicationDbContext.Workouts
                .Include(w => w.WorkoutExercises)
                .ThenInclude(we => we.Exercise)
                .FirstOrDefaultAsync(w => w.Id == workoutId);
        }

        public async Task<Workout> UpdateWorkoutAsync(Workout workoutToUpdate)
        {
            _applicationDbContext.Workouts.Update(workoutToUpdate);
            await _applicationDbContext.SaveChangesAsync();
            return workoutToUpdate;
        }

        public async Task<Workout> DeleteWorkoutAsync(Workout workoutToDelete)
        {
            _applicationDbContext.Workouts.Remove(workoutToDelete);
            await _applicationDbContext.SaveChangesAsync();

            return workoutToDelete;
        }

        public async Task RemoveExerciseFromWorkoutAsync(WorkoutExercise exerciseToRemove)
        {

            _applicationDbContext.WorkoutExercise.Remove(exerciseToRemove);
            await _applicationDbContext.SaveChangesAsync();
        }
    }
}
