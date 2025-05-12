using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PhysiquePlanner.Api.Dtos.ExerciseDtos;
using PhysiquePlanner.Repositories.Interfaces;

namespace PhysiquePlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        private readonly IExerciseRepository _exerciseRepository;
        private readonly IMapper _mapper;

        public ExercisesController(IExerciseRepository exerciseRepository, IMapper mapper)
        {
            _exerciseRepository = exerciseRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllExercises()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var exercises = await _exerciseRepository.GetAllExercisesAsync();
            var exercisesDto = _mapper.Map<ICollection<ExerciseDto>>(exercises);
            return Ok(exercisesDto);
        }

        [HttpGet("{exerciseId}")]
        public async Task<IActionResult> GetExercise([FromRoute] int exerciseId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var exercise = await _exerciseRepository.GetExerciseByIdAsync(exerciseId);

            if (exercise == null)
                return NotFound();

            var exerciseDto = _mapper.Map<ExerciseDto>(exercise);

            return Ok(exerciseDto);
        }

    }
}
