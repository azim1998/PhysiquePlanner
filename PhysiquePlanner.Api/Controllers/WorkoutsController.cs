using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PhysiquePlanner.Api.Dtos.WorkoutDtos;
using PhysiquePlanner.Api.Models;
using PhysiquePlanner.Api.Repositories.Interfaces;
using PhysiquePlanner.Api.Services.Interfaces;
using System.Security.Claims;

namespace PhysiquePlanner.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutsController : ControllerBase
    {
        private readonly IWorkoutRepository _workoutRepository;
        private readonly IWorkoutService _workoutService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public WorkoutsController(IWorkoutRepository workoutReposiory, IWorkoutService workoutService, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _workoutRepository = workoutReposiory;
            _workoutService = workoutService;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPublicWorkouts()
        {
            var workouts = await _workoutRepository.GetAllPublicWorkoutsAsync();
            var workoutsDto = _mapper.Map<ICollection<WorkoutDto>>(workouts);

            return Ok(workoutsDto);
        }

        [HttpGet("{workoutName:alpha}")]
        public async Task<IActionResult> GetPublicWorkoutByName([FromRoute] string workoutName)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var workouts = await _workoutRepository.GetPublicWorkoutByNameAsync(workoutName);

            if (workouts == null)
                return NotFound("No workouts found");

            var workoutsDto = _mapper.Map<ICollection<WorkoutDto>>(workouts);

            return Ok(workoutsDto);
        }

        [Authorize]
        [HttpGet("userWorkouts")]
        public async Task<IActionResult> GetUserWorkouts()
        {

            var userName = User.FindFirstValue(ClaimTypes.GivenName);
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return NotFound("User does not exist");

            var userWorkouts = await _workoutRepository.GetUserWorkoutsAsync(user.Id);

            if (userWorkouts == null)
                return NotFound("User has no saved workouts");

            var userWorkoutsDto = _mapper.Map<ICollection<WorkoutDto>>(userWorkouts);

            return Ok(userWorkoutsDto);
        }

        [HttpGet("{workoutId:int}")]
        public async Task<IActionResult> GetWorkout([FromRoute] int workoutId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var workout = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

            if (workout == null)
                return NotFound();

            var workoutDto = _mapper.Map<WorkoutDto>(workout);

            return Ok(workoutDto);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateWorkout([FromBody] WorkoutCreationDto workoutCreationDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userName = User.FindFirstValue(ClaimTypes.GivenName);
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return StatusCode(500, "Internal Server error");


            var workoutCreated = await _workoutService.CreateWorkoutAsync(workoutCreationDto, user.Id);

            if (workoutCreated == null)
                return StatusCode(500, "Workout could not be created");

            var workoutDto = _mapper.Map<WorkoutDto>(workoutCreated);

            return CreatedAtAction(nameof(GetWorkout), new { workoutId = workoutCreated.Id }, workoutDto);
        }

        [HttpPut("{workoutId}")]
        public async Task<IActionResult> UpdateWorkout([FromRoute] int workoutId, [FromBody] WorkoutUpdateDto workoutUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var workoutUpdated = await _workoutService.UpdateWorkoutAsync(workoutId, workoutUpdateDto);

            if (workoutUpdated == null)
                return StatusCode(500, "Internal server error");

            return Ok(workoutUpdated);

        }

        [HttpPost("{workoutId}/exercises")]
        public async Task<IActionResult> AddExercisesToWorkout([FromRoute] int workoutId, [FromBody] AddExercisesToWorkoutDto exerciseIds)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var workoutUpdated = await _workoutService.AddExercisesToWorkoutAsync(workoutId, exerciseIds);

            if (workoutUpdated == null)
                return StatusCode(500, "Internal server error");

            return Ok();

        }

        [HttpDelete("{workoutId}")]
        public async Task<IActionResult> DeleteWorkout([FromRoute] int workoutId)
        {
            var workoutToDelete = await _workoutRepository.GetWorkoutByIdAsync(workoutId);

            if (workoutToDelete == null)
                return NotFound("Workout does not exist");


            var workoutDeleted = await _workoutRepository.DeleteWorkoutAsync(workoutToDelete);

            if (workoutDeleted == null)
                return StatusCode(500, "Workout could not be deleted");

            return Ok();
        }

        [HttpDelete("{workoutId}/exercises/{exerciseId}")]
        public async Task<IActionResult> RemoveExerciseFromWorkout([FromRoute] int workoutId, [FromRoute] int exerciseId)
        {
            var workoutDeleted = await _workoutService.RemoveExerciseFromWorkoutAsync(workoutId, exerciseId);

            if (workoutDeleted == null)
                return StatusCode(500, "Workout could not be deleted");

            return Ok();
        }

    }
}
