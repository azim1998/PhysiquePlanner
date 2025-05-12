using PhysiquePlanner.Api.Models;

namespace PhysiquePlanner.Api.Services.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(ApplicationUser user);
    }
}
