using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PhysiquePlanner.Api.Models.Results;

namespace PhysiquePlanner.Api.Common
{
    public class BaseApiController : ControllerBase
    {
        private readonly IMapper _mapper;
        public BaseApiController(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected IActionResult ReturnResult<TSource, TDest>(Result<TSource> result)
        {
            if (!result.Success)
                return StatusCode(500, Result<object>.Fail(result.Message));

            if (result.Data != null)
            {
                var destinationDto = _mapper.Map<TDest>(result.Data);
                return Ok(Result<TDest>.Ok(destinationDto, result.Message));
            }

            return Ok(Result<object>.Ok(message: result.Message));
        }

        protected IActionResult ReturnNoDataResult(Result<object> result)
        {
            if (!result.Success)
                return StatusCode(500, Result<object>.Fail(result.Message));

            return Ok(Result<object>.Ok(message: result.Message));
        }

        protected IActionResult ReturnNotFound(string message = "Resource not found")
        {
            return NotFound(Result<object>.Fail(message));
        }

        protected IActionResult ReturnBadRequest(string message = "Bad Request")
        {
            return BadRequest(Result<object>.Fail(message));
        }

    }
}
