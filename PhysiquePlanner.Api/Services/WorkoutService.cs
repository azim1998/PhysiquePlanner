using AutoMapper;
using PhysiquePlanner.Api.Constants;
using PhysiquePlanner.Api.Dtos.WorkoutDtos;
using PhysiquePlanner.Api.Models.Results;
using PhysiquePlanner.Api.Repositories.Interfaces;
using PhysiquePlanner.Api.Services.Interfaces;
using PhysiquePlanner.Models;
using PhysiquePlanner.Repositories.Interfaces;

namespace PhysiquePlanner.Api.Services
{
    public class WorkoutService : IWorkoutService
    {
        private readonly IWorkoutRepository _workoutRepository;
        private readonly IExerciseRepository _exerciseRepository;
        private readonly IMapper _mapper;

        public WorkoutService(IWorkoutRepository workoutRepository, IExerciseRepository exerciseRepository, IMapper mapper)
        {
            _workoutRepository = workoutRepository;
            _exerciseRepository = exerciseRepository;
            _mapper = mapper;
        }

        public async Task<Result<ICollection<Workout>>> GetAllPublicWorkoutsAsync()
        {
            try
            {
                var workouts = await _workoutRepository.GetAllPublicWorkoutsAsync();

                return Result<ICollection<Workout>>.Ok(workouts);
            }
            catch (Exception ex)
            {
                return Result<ICollection<Workout>>.Fail($"Failed to get workouts, please try again");
            }

        }

        public async Task<Result<ICollection<Workout>>> GetPublicWorkoutByNameAsync(string workoutName)
        {
            try
            {
                var workouts = await _workoutRepository.GetPublicWorkoutByNameAsync(workoutName);

                return Result<ICollection<Workout>>.Ok(workouts);
            }
            catch (Exception ex)
            {
                return Result<ICollection<Workout>>.Fail($"Failed to get workouts, please try again");
            }

        }

        public async Task<Result<ICollection<Workout>>> GetUserWorkoutsByNameAsync(string workoutName, string userId)
        {
            try
            {
                var workouts = await _workoutRepository.GetUserWorkoutsByNameAsync(workoutName, userId);

                return Result<ICollection<Workout>>.Ok(workouts);
            }
            catch (Exception ex)
            {
                return Result<ICollection<Workout>>.Fail("Failed to get workouts, please try again");
            }
        }

        public async Task<Result<ICollection<Workout>>> GetUserWorkoutsAsync(string userId)
        {
            try
            {
                var workouts = await _workoutRepository.GetUserWorkoutsAsync(userId);

                return Result<ICollection<Workout>>.Ok(workouts);
            }
            catch (Exception ex)
            {
                return Result<ICollection<Workout>>.Fail($"Failed to get workouts, please try again");
            }

        }

        public async Task<Result<Workout>> GetWorkoutByIdAsync(int workoutId)
        {
            try
            {
                var workouts = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

                return Result<Workout>.Ok(workouts);
            }
            catch (Exception ex)
            {
                return Result<Workout>.Fail($"Failed to get workout, please try again");
            }

        }

        public async Task<Result<Workout>> CreateWorkoutAsync(WorkoutCreationDto workoutCreationDto, string userId)
        {
            try
            {
                var workoutToCreate = _mapper.Map<Workout>(workoutCreationDto);
                workoutToCreate.ApplicationUserId = userId;

                var created = await _workoutRepository.CreateWorkoutAsync(workoutToCreate);

                return Result<Workout>.Ok(created, "Workout created successfully");
            }
            catch (Exception ex)
            {
                return Result<Workout>.Fail($"Failed to create workout, please try again");
            }

        }

        public async Task<Result<Workout>> CloneWorkoutAsync(int workoutId, string userId)
        {
            try
            {
                var sourceWorkout = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

                if (sourceWorkout == null)
                    return Result<Workout>.Fail("Workout does not exist");

                var clone = new Workout
                {
                    Name = sourceWorkout.Name,
                    Description = sourceWorkout.Description,
                    ApplicationUserId = userId,
                    Duration = sourceWorkout.Duration,
                    Difficulty = sourceWorkout.Difficulty,
                    WorkoutType = sourceWorkout.WorkoutType,
                    WorkoutExercises = sourceWorkout.WorkoutExercises.Select(e => new WorkoutExercise
                    {
                        ExerciseId = e.ExerciseId,
                        Sets = e.Sets,
                        Reps = e.Reps
                    }).ToList()
                };

                var created = await _workoutRepository.CreateWorkoutAsync(clone);

                return Result<Workout>.Ok(created, "Workout cloned successfully");
            }
            catch (Exception ex)
            {
                return Result<Workout>.Fail($"Failed to save workout, please try again");
            }
        }

        public async Task<Result<Workout>> ShareWorkoutAsync(int workoutId)
        {
            try
            {
                var sourceWorkout = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

                if (sourceWorkout == null)
                    return Result<Workout>.Fail("Workout does not exist");

                var sharedWorkout = new Workout
                {
                    Name = sourceWorkout.Name,
                    Description = sourceWorkout.Description,
                    ApplicationUserId = SystemUser.Id,
                    Duration = sourceWorkout.Duration,
                    Difficulty = sourceWorkout.Difficulty,
                    WorkoutType = sourceWorkout.WorkoutType,
                    WorkoutExercises = sourceWorkout.WorkoutExercises.Select(e => new WorkoutExercise
                    {
                        ExerciseId = e.ExerciseId,
                        Sets = e.Sets,
                        Reps = e.Reps
                    }).ToList()
                };

                var created = await _workoutRepository.CreateWorkoutAsync(sharedWorkout);

                return Result<Workout>.Ok(created, "Workout shared successfully");
            }
            catch (Exception ex)
            {
                return Result<Workout>.Fail($"Failed to share workout, please try again");
            }

        }

        public async Task<Result<Workout>> UpdateWorkoutAsync(int workoutId, WorkoutUpdateDto workoutUpdateDto) //Change to ReplaceWorkout i.e. Put
        {
            try
            {
                var workoutToUpdate = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

                if (workoutToUpdate == null)
                    return Result<Workout>.Fail("Workout does not exist");

                workoutToUpdate = _mapper.Map(workoutUpdateDto, workoutToUpdate);

                var updated = await _workoutRepository.UpdateWorkoutAsync(workoutToUpdate);

                return Result<Workout>.Ok(updated, "Workout updated successfully");
            }
            catch (Exception ex)
            {
                return Result<Workout>.Fail($"Failed to update workout, please try again");
            }

        }

        public async Task<Result<Workout>> PartiallyUpdateWorkoutAsync(int workoutId, WorkoutUpdateDto workoutUpdateDto)
        {
            try
            {
                var workoutToUpdate = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

                if (workoutToUpdate == null)
                    return Result<Workout>.Fail("Workout does not exist");

                if (workoutUpdateDto.Name != null) workoutToUpdate.Name = workoutUpdateDto.Name;
                if (workoutUpdateDto.Description != null) workoutToUpdate.Description = workoutUpdateDto.Description;
                if (workoutUpdateDto.IsPrivate.HasValue) workoutToUpdate.IsPrivate = workoutUpdateDto.IsPrivate.Value; //Remove
                if (workoutUpdateDto.Difficulty.HasValue) workoutToUpdate.Difficulty = workoutUpdateDto.Difficulty.Value;
                if (workoutUpdateDto.Duration.HasValue) workoutToUpdate.Duration = workoutUpdateDto.Duration.Value;
                if (workoutUpdateDto.WorkoutType != null) workoutToUpdate.WorkoutType = workoutUpdateDto.WorkoutType;

                if (workoutUpdateDto.WorkoutExercises.Count > 0)
                {
                    foreach (var updatedExercise in workoutUpdateDto.WorkoutExercises)
                    {
                        var existingExercise = workoutToUpdate.WorkoutExercises.FirstOrDefault(we => we.ExerciseId == updatedExercise.ExerciseId);
                        if (existingExercise != null)
                        {
                            if (updatedExercise.Reps.HasValue) existingExercise.Reps = updatedExercise.Reps.Value;
                            if (updatedExercise.Sets.HasValue) existingExercise.Sets = updatedExercise.Sets.Value;
                        }
                    }
                }

                var updated = await _workoutRepository.UpdateWorkoutAsync(workoutToUpdate);
                return Result<Workout>.Ok(updated, "Workout updated successfully");
            }
            catch (Exception ex)
            {
                return Result<Workout>.Fail($"Failed to update workout, please try again");
            }
        }

        public async Task<Result<Workout>> AddExercisesToWorkoutAsync(int workoutId, AddExercisesToWorkoutDto exerciseIds)
        {
            try
            {
                var workoutToUpdate = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

                if (workoutToUpdate == null)
                    return Result<Workout>.Fail("Workout does not exist");

                foreach (var exerciseId in exerciseIds.ExerciseIds)
                {
                    if (!workoutToUpdate.WorkoutExercises.Any(we => we.ExerciseId == exerciseId))
                    {
                        var exerciseToAdd = new WorkoutExercise
                        {
                            ExerciseId = exerciseId,
                            WorkoutId = workoutId,
                        };

                        workoutToUpdate.WorkoutExercises.Add(exerciseToAdd);
                    }
                }

                var updated = await _workoutRepository.UpdateWorkoutAsync(workoutToUpdate);
                return Result<Workout>.Ok(updated, "Exercises added successfully");
            }
            catch (Exception ex)
            {
                return Result<Workout>.Fail($"Failed to update workout, please try again");
            }
        }

        public async Task<Result<Workout>> RemoveExerciseFromWorkoutAsync(int workoutId, int exerciseId)
        {
            try
            {
                var workout = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

                if (workout == null)
                    return Result<Workout>.Fail("Workout does not exist");

                var workoutExerciseToRemove = workout.WorkoutExercises.FirstOrDefault(we => we.ExerciseId == exerciseId);

                if (workoutExerciseToRemove == null)
                    return Result<Workout>.Fail("Exercise not found in workout");

                await _workoutRepository.RemoveExerciseFromWorkoutAsync(workoutExerciseToRemove);

                return Result<Workout>.Ok(workout, "Exercise removed successfully");
            }
            catch (Exception ex)
            {
                return Result<Workout>.Fail($"Failed to update workout, please try again");
            }
        }

        public async Task<Result<object>> DeleteWorkoutAsync(int workoutId)
        {
            var workoutToDelete = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

            if (workoutToDelete == null)
                return Result<object>.Fail("Workout does not exist");

            var workoutDeleted = await _workoutRepository.DeleteWorkoutAsync(workoutToDelete);

            if (workoutDeleted == null)
                return Result<object>.Fail("Workout could not be deleted");

            return Result<object>.Ok(message: "Workout deleted successfully");
        }

    }
}
