using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application;

public class Create
{
    public class Command : IRequest<Result<Unit>>
    {
        public ProductRequest? Product { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IValidator<ProductRequest> _validator;

        public Handler(DataContext context, IValidator<ProductRequest> validator)
        {
            _validator = validator;
            _context = context; 
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            _validator.ValidateAndThrow(request.Product!);

            var product = new Product
            {
                Name = request.Product!.Name!,
                Description = request.Product!.Description!,
                CategoryId = request.Product!.CategoryId!,
                PhotoUrl = request.Product!.PhotoUrl!
            };
            _context.Products.Add(product);
            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to create activity");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
