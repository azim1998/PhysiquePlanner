using AutoMapper;
using PhysiquePlanner.Api.Dtos.WorkoutDtos;
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
        public async Task<Workout> CreateWorkoutAsync(WorkoutCreationDto workoutCreationDto, string userId)
        {
            var workoutToCreate = _mapper.Map<Workout>(workoutCreationDto);
            workoutToCreate.ApplicationUserId = userId;

            /*
            foreach (var workoutExercise in workoutToCreate.WorkoutExercises)
            {
                var exercise = await _exerciseRepository.GetExerciseByIdAsync(workoutExercise.ExerciseId);
                workoutExercise.Exercise = exercise;
            }
            */

            return await _workoutRepository.CreateWorkoutAsync(workoutToCreate);
        }

        public async Task<Workout?> UpdateWorkoutAsync(int workoutId, WorkoutUpdateDto workoutUpdateDto) //Change to ReplaceWorkout i.e. Put
        {
            var workoutToUpdate = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

            if (workoutToUpdate == null)
                return null;

            workoutToUpdate = _mapper.Map(workoutUpdateDto, workoutToUpdate);

            return await _workoutRepository.UpdateWorkoutAsync(workoutToUpdate);
        }

        public async Task<Workout?> PartiallyUpdateWorkoutAsync(int workoutId, WorkoutUpdateDto workoutUpdateDto) //Change to updateWorkoutAsync
        {
            var workoutToUpdate = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

            if (workoutToUpdate == null)
                return null;

            if (workoutUpdateDto.Name != null) workoutToUpdate.Name = workoutUpdateDto.Name;
            if (workoutUpdateDto.Description != null) workoutToUpdate.Description = workoutUpdateDto.Description;
            if (workoutUpdateDto.IsPrivate.HasValue) workoutToUpdate.IsPrivate = workoutUpdateDto.IsPrivate.Value;


            if (workoutUpdateDto.WorkoutExercises.Count > 0)
            {
                foreach (var updatedExercise in workoutUpdateDto.WorkoutExercises)
                {
                    var existingExercise = workoutToUpdate.WorkoutExercises.FirstOrDefault(we => we.ExerciseId == updatedExercise.ExerciseId);

                    if (updatedExercise.Reps.HasValue) existingExercise.Reps = updatedExercise.Reps.Value;
                    if (updatedExercise.Sets.HasValue) existingExercise.Sets = updatedExercise.Sets.Value;
                }
            }

            return await _workoutRepository.UpdateWorkoutAsync(workoutToUpdate);
        }

        public async Task<Workout?> AddExercisesToWorkoutAsync(int workoutId, AddExercisesToWorkoutDto exerciseIds)
        {
            var workoutToUpdate = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

            if (workoutToUpdate == null)
                return null;

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

            return await _workoutRepository.UpdateWorkoutAsync(workoutToUpdate);

        }

        public async Task<Workout?> RemoveExerciseFromWorkoutAsync(int workoutId, int exerciseId)
        {
            var workout = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

            if (workout == null) return null;

            var workoutExerciseToRemove = workout.WorkoutExercises.Where(we => we.ExerciseId == exerciseId).FirstOrDefault();

            if (workoutExerciseToRemove == null) return null;

            await _workoutRepository.RemoveExerciseFromWorkoutAsync(workoutExerciseToRemove);

            return workout;
        }
    }
}
