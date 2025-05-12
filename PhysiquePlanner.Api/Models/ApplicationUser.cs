using Microsoft.AspNetCore.Identity;
using PhysiquePlanner.Models;

namespace PhysiquePlanner.Api.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Workout> Workouts { get; set; }
    }
}
