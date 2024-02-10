using AutoMapper;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application;

public class Edit
{
    public class Command : IRequest<Result<Unit>>
    {
        public ProductRequest? Product { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IValidator<ProductRequest> _validator;

        public Handler(DataContext context, IMapper mapper, IValidator<ProductRequest> validator)
        {
            _context = context;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            _validator.ValidateAndThrow(request.Product!);
            
            var product = await _context.Products.FindAsync(request!.Product!.Id);
            if (product == null) return null;

            _mapper.Map(request.Product, product);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to update product");
            
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
