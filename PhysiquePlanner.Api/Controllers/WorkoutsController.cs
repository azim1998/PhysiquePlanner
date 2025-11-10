using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PhysiquePlanner.Api.Common;
using PhysiquePlanner.Api.Dtos.WorkoutDtos;
using PhysiquePlanner.Api.Models;
using PhysiquePlanner.Api.Services.Interfaces;
using PhysiquePlanner.Models;
using System.Security.Claims;

namespace PhysiquePlanner.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutsController : BaseApiController
    {
        private readonly IWorkoutService _workoutService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public WorkoutsController(IWorkoutService workoutService, UserManager<ApplicationUser> userManager, IMapper mapper) : base(mapper)
        {
            _workoutService = workoutService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPublicWorkouts()
        {
            var result = await _workoutService.GetAllPublicWorkoutsAsync();

            if (result.Data == null || !result.Data.Any())
                return ReturnNotFound("Workouts not found");

            return ReturnResult<ICollection<Workout>, ICollection<WorkoutDto>>(result);
        }

        [HttpGet("{workoutName:alpha}")]
        public async Task<IActionResult> GetPublicWorkoutByName([FromRoute] string workoutName)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _workoutService.GetPublicWorkoutByNameAsync(workoutName);

            if (result.Data == null || !result.Data.Any())
                return ReturnNotFound("Workouts not found");

            return ReturnResult<ICollection<Workout>, ICollection<WorkoutDto>>(result);
        }

        [Authorize]
        [HttpGet("userWorkouts")]
        public async Task<IActionResult> GetUserWorkouts()
        {

            var userName = User.FindFirstValue(ClaimTypes.GivenName);
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return ReturnNotFound("User not found");

            var result = await _workoutService.GetUserWorkoutsAsync(user.Id);

            if (result.Data == null || !result.Data.Any())
                return ReturnNotFound("Workouts not found");


            return ReturnResult<ICollection<Workout>, ICollection<WorkoutDto>>(result);
        }

        [Authorize]
        [HttpGet("userWorkouts/{workoutName:alpha}")]
        public async Task<IActionResult> GetUserWorkoutsByName([FromRoute] string workoutName)
        {
            var userName = User.FindFirstValue(ClaimTypes.GivenName);
            var user = await _userManager.FindByNameAsync(userName);

            var result = await _workoutService.GetUserWorkoutsByNameAsync(workoutName, user.Id);

            if (result.Data == null || !result.Data.Any())
                return ReturnNotFound("Workouts not found");

            return ReturnResult<ICollection<Workout>, ICollection<WorkoutDto>>(result);
        }

        [HttpGet("{workoutId:int}")]
        public async Task<IActionResult> GetWorkout([FromRoute] int workoutId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _workoutService.GetWorkoutByIdAsync(workoutId);

            if (result == null)
                return ReturnNotFound("Workout does not exist");

            return ReturnResult<Workout, WorkoutDto>(result);
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
                return ReturnNotFound("User not found");


            var result = await _workoutService.CreateWorkoutAsync(workoutCreationDto, user.Id);

            return ReturnResult<Workout, WorkoutDto>(result);

            //What should i do with this?
            //return CreatedAtAction(nameof(GetWorkout), new { workoutId = workoutDto.Id }, workoutDto);
        }

        [HttpPost("{workoutId}/share")]
        public async Task<IActionResult> ShareWorkout([FromRoute] int workoutId)
        {
            var result = await _workoutService.ShareWorkoutAsync(workoutId);

            return ReturnResult<Workout, WorkoutDto>(result);
        }


        [HttpPost("{workoutId}/save")]
        public async Task<IActionResult> SaveWorkout([FromRoute] int workoutId)
        {
            var userName = User.FindFirstValue(ClaimTypes.GivenName);
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return ReturnNotFound("User not found");

            var result = await _workoutService.CloneWorkoutAsync(workoutId, user.Id);

            return ReturnResult<Workout, WorkoutDto>(result);
        }

        [HttpPut("{workoutId}")]
        public async Task<IActionResult> UpdateWorkout([FromRoute] int workoutId, [FromBody] WorkoutUpdateDto workoutUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _workoutService.UpdateWorkoutAsync(workoutId, workoutUpdateDto);

            return ReturnResult<Workout, WorkoutDto>(result);
        }

        [HttpPatch("{workoutId}")]
        public async Task<IActionResult> PatchWorkout([FromRoute] int workoutId, [FromBody] WorkoutUpdateDto workoutUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _workoutService.PartiallyUpdateWorkoutAsync(workoutId, workoutUpdateDto);

            return ReturnResult<Workout, WorkoutDto>(result);
        }

        [HttpPost("{workoutId}/exercises")]
        public async Task<IActionResult> AddExercisesToWorkout([FromRoute] int workoutId, [FromBody] AddExercisesToWorkoutDto exerciseIds)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _workoutService.AddExercisesToWorkoutAsync(workoutId, exerciseIds);

            return ReturnResult<Workout, WorkoutDto>(result);
        }

        [HttpDelete("{workoutId}")]
        public async Task<IActionResult> DeleteWorkout([FromRoute] int workoutId)
        {
            var result = await _workoutService.DeleteWorkoutAsync(workoutId);

            return ReturnNoDataResult(result);
        }

        [HttpDelete("{workoutId}/exercises/{exerciseId}")]
        public async Task<IActionResult> RemoveExerciseFromWorkout([FromRoute] int workoutId, [FromRoute] int exerciseId)
        {
            var result = await _workoutService.RemoveExerciseFromWorkoutAsync(workoutId, exerciseId);

            return ReturnResult<Workout, WorkoutDto>(result);
        }


    }
}
