using PhysiquePlanner.Api.Constants;
using PhysiquePlanner.Api.Models;

namespace PhysiquePlanner.Api.Data.SeedData
{
    public static class SystemUserSeed
    {
        public static readonly List<ApplicationUser> Data = new List<ApplicationUser>()
        {
            new ApplicationUser
            {
                Id = SystemUser.Id,
                UserName = SystemUser.Username,
                NormalizedUserName = SystemUser.Username.ToUpper(),
                Email = SystemUser.Email,
                NormalizedEmail = SystemUser.Email.ToUpper(),
                EmailConfirmed = true,
                PasswordHash = "",
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),


            }
        };
    }
}
