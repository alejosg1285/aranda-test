using Application;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class PhotoController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] Upload.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}