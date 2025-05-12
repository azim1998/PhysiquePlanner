using System.ComponentModel.DataAnnotations;

namespace PhysiquePlanner.Api.Dtos.UserDtos
{
    public class ResgisterUserDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]

        public string Password { get; set; }
    }
}
