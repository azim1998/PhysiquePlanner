namespace PhysiquePlanner.Api.Models.Results
{
    public class Result<T>
    {
        public T? Data { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;

        public static Result<T> Ok(T? data = default, string message = "")
        {
            return new Result<T> { Success = true, Data = data, Message = message };
        }

        public static Result<T> Fail(string message)
        {
            return new Result<T> { Success = false, Message = message };
        }
    }
}
