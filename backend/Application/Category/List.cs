using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application;

public class List
{
    public class Query : IRequest<Result<List<CategoryDto>>>
    {}

    public class Handler : IRequestHandler<Query, Result<List<CategoryDto>>>
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<CategoryDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var categories = await _context.Categories
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result<List<CategoryDto>>.Success(categories);
        }
    }
}
