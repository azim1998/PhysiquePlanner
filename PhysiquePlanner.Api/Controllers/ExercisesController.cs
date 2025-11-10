using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PhysiquePlanner.Api.Common;
using PhysiquePlanner.Api.Dtos.ExerciseDtos;
using PhysiquePlanner.Api.Services.Interfaces;
using PhysiquePlanner.Models;

namespace PhysiquePlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : BaseApiController
    {
        private readonly IExerciseService _exerciseService;

        public ExercisesController(IExerciseService exerciseService, IMapper mapper) : base(mapper)
        {
            _exerciseService = exerciseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllExercises()
        {
            var result = await _exerciseService.GetAllExercisesAsync();

            if (result.Data == null || !result.Data.Any())
                return ReturnNotFound("No exercises found");

            return ReturnResult<ICollection<Exercise>, ICollection<ExerciseDto>>(result);
        }

        [HttpGet("{exerciseId:int}")]
        public async Task<IActionResult> GetExercise([FromRoute] int exerciseId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _exerciseService.GetExerciseByIdAsync(exerciseId);

            if (result.Data == null)
                return ReturnNotFound("Exercise could not be found");

            return ReturnResult<Exercise, ExerciseDto>(result);
        }

        [HttpGet("{exerciseName:alpha}")]
        public async Task<IActionResult> GetExercisesByName([FromRoute] string exerciseName)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _exerciseService.GetExerciseByNameAsync(exerciseName);

            if (result.Data == null || !result.Data.Any())
                return ReturnNotFound("No exercises found");

            return ReturnResult<ICollection<Exercise>, ICollection<ExerciseDto>>(result);
        }

    }
}
