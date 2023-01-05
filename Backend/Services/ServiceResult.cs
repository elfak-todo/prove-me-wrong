public enum ServiceStatusCode
{
    Success,
    NotFound,
    Other
}

public class ServiceResult<T>
{
    public T? Result { get; set; }
    public ServiceStatusCode StatusCode { get; set; }
    public string? ErrorMessage { get; set; }
}