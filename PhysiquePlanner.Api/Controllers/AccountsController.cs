using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PhysiquePlanner.Api.Dtos.UserDtos;
using PhysiquePlanner.Api.Models;
using PhysiquePlanner.Api.Services.Interfaces;

namespace PhysiquePlanner.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountsController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] ResgisterUserDto registerUserDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var user = new ApplicationUser { Email = registerUserDto.Email, UserName = registerUserDto.UserName };
                var createdUserResult = await _userManager.CreateAsync(user, registerUserDto.Password);

                if (!createdUserResult.Succeeded)
                    return StatusCode(500, createdUserResult.Errors.Select(e => e.Description));


                var roleResult = await _userManager.AddToRoleAsync(user, "User");

                if (!roleResult.Succeeded)
                    return StatusCode(500, roleResult.Errors.Select(e => e.Description));

                return Ok(
                        new NewUserDto
                        {
                            UserName = registerUserDto.UserName,
                            Email = registerUserDto.Email,
                            Token = _tokenService.CreateToken(user),
                        });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserDto loginUserDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var user = await _userManager.FindByNameAsync(loginUserDto.UserName);

                if (user == null)
                    return Unauthorized("Invalid Username");

                var signInResult = await _signInManager.CheckPasswordSignInAsync(user, loginUserDto.Password, false);

                if (!signInResult.Succeeded)
                {
                    return Unauthorized("Invalid Username and/or Password");
                }

                return Ok(
                    new NewUserDto
                    {
                        UserName = user.UserName,
                        Email = user.Email,
                        Token = _tokenService.CreateToken(user)
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
