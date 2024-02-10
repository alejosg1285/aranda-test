using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products;

public class List
{
    public class Query : IRequest<Result<List<ProductDto>>>
    {
        public FilterRequest? FilterParams { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<ProductDto>>>
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        
        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<ProductDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var products = _context.Products
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            if (Enum.IsDefined(typeof(FilterByEnum), request!.FilterParams!.FilterBy)
                && !string.IsNullOrEmpty(request!.FilterParams!.FilterValue))
            {
                var filterValue = request!.FilterParams!.FilterValue!.ToLower();
                switch (request!.FilterParams!.FilterBy)
                {
                    case FilterByEnum.Name:
                        products = products.Where(p => p.Name!.ToLower().Contains(filterValue));
                        break;
                    case FilterByEnum.Description:
                        products = products.Where(p => p.Description!.ToLower().Contains(filterValue));
                        break;
                    case FilterByEnum.Category:
                        products = products.Where(p => p.Category!.Name!.ToLower().Contains(filterValue));
                        break;
                    default:
                        break;
                }
            }
            
            if (Enum.IsDefined(typeof(OrderByEnum), request!.FilterParams!.OrderBy) 
                && Enum.IsDefined(typeof(DirectionOrderEnum), request!.FilterParams!.DirectionOrder))
            {
                switch (request!.FilterParams!.OrderBy)
                {
                    case OrderByEnum.Name:
                        switch (request!.FilterParams!.DirectionOrder)
                        {
                            case DirectionOrderEnum.Ascending:
                                products = products.OrderBy(p => p.Name);
                                break;
                            case DirectionOrderEnum.Descending:
                                products = products.OrderByDescending(p => p.Name);
                                break;
                            default:
                                break;
                        }
                        break;
                    case OrderByEnum.Category:
                        switch (request!.FilterParams!.DirectionOrder)
                        {
                            case DirectionOrderEnum.Ascending:
                                products = products.OrderBy(p => p.Category!.Name);
                                break;
                            case DirectionOrderEnum.Descending:
                                products = products.OrderByDescending(p => p.Category!.Name);
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            }

            return Result<List<ProductDto>>.Success(await products.ToListAsync());
        }
    }
}
