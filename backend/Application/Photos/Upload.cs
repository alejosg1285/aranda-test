using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application;

public class Upload
{
    public class Command : IRequest<Result<Photo>>
    {
        public required IFormFile File { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Photo>>
    {
        private readonly IPhotoAccessor _photoAccessor;

        public Handler(IPhotoAccessor photoAccessor)
        {
            _photoAccessor = photoAccessor;
        }

        public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var uploadResult = await _photoAccessor.UploadPhoto(request.File);
            var photo = new Photo
            {
                Url = uploadResult.Url!,
                Id = uploadResult.PublicId!
            };

            return Result<Photo>.Success(photo);
        }
    }
}
