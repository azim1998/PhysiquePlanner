using AutoMapper;
using PhysiquePlanner.Api.Dtos.ExerciseDtos;
using PhysiquePlanner.Api.Dtos.MuscleDtos;
using PhysiquePlanner.Api.Dtos.WorkoutDtos;
using PhysiquePlanner.Api.Dtos.WorkoutExerciseDtos;
using PhysiquePlanner.Models;

namespace PhysiquePlanner.Mappings
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<Exercise, ExerciseDto>()
                .ForMember(dest => dest.Muscles, opt => opt.MapFrom(src => src.ExerciseMuscles.Select(em => em.Muscle)));

            CreateMap<Muscle, MuscleDto>();

            CreateMap<Workout, WorkoutDto>()
                .ForMember(dest => dest.Owner, opt => opt.MapFrom(src => src.ApplicationUser.UserName))
                .ForMember(dest => dest.WorkoutExercises, opt => opt.MapFrom(src => src.WorkoutExercises));

            CreateMap<WorkoutCreationDto, Workout>();
            /*
            .ForMember(dest => dest.WorkoutExercises, opt => opt.MapFrom(src => src.WorkoutExercises.Select(es => new WorkoutExercise
            {
                ExerciseId = es.ExerciseId,
                Sets = es.Sets.Value,
                Reps = es.Reps.Value
            })));
            */

            CreateMap<WorkoutUpdateDto, Workout>()
                .ForMember(dest => dest.WorkoutExercises, opt => opt.MapFrom(src => src.WorkoutExercises.Select(es => new WorkoutExercise
                {
                    ExerciseId = es.ExerciseId,
                    Sets = es.Sets.Value,
                    Reps = es.Reps.Value
                })));

            CreateMap<WorkoutExercise, WorkoutExerciseDto>()
                .ForMember(dest => dest.ExerciseName, opt => opt.MapFrom(src => src.Exercise.Name));

            CreateMap<WorkoutExercise, ExerciseSelectionDto>();



        }
    }
}
