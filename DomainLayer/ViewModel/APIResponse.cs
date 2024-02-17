using System.Net;
using static Utility.Enums;

namespace DomainLayer.ViewModel
{
    public class APIResponse
    {
        public APIResponse(HttpStatusCode statusCode, APIStatus status, string message = null, object data = null)
        {
            StatusCode = statusCode;
            Status = status.ToString();
            Message = message;
            Data = data;
        }
        public HttpStatusCode StatusCode { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
    }
}
