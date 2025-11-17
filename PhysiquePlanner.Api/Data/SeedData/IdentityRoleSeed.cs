using Microsoft.AspNetCore.Identity;

namespace PhysiquePlanner.Api.Data.SeedData
{
    public static class IdentityRoleSeed
    {
        public static readonly IdentityRole[] Data =
        {
            new IdentityRole
            {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole
            {
                Name = "User",
                NormalizedName = "USER"
            }
        };
    }
}
