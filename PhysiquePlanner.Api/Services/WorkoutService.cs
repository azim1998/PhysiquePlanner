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

            foreach (var workoutExercise in workoutToCreate.WorkoutExercises)
            {
                var exercise = await _exerciseRepository.GetExerciseByIdAsync(workoutExercise.ExerciseId);
                workoutExercise.Exercise = exercise;
            }

            return await _workoutRepository.CreateWorkoutAsync(workoutToCreate);
        }

        public async Task<Workout?> UpdateWorkoutAsync(int workoutId, WorkoutUpdateDto workoutUpdateDto)
        {
            var workoutToUpdate = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

            if (workoutToUpdate == null)
                return null;

            workoutToUpdate = _mapper.Map(workoutUpdateDto, workoutToUpdate);

            return await _workoutRepository.UpdateWorkoutAsync(workoutToUpdate);
        }

    }
}
