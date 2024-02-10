using Microsoft.AspNetCore.Http;

namespace Application;

public interface IPhotoAccessor
{
    public Task<PhotoUploadResult> UploadPhoto(IFormFile file);
}
