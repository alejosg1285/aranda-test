using Domain;

namespace Application;

public class MappingProfile : AutoMapper.Profile
{
    public MappingProfile()
    {
        CreateMap<Category, CategoryDto>();
        CreateMap<Product, ProductDto>();

        CreateMap<ProductRequest, Product>();
    }
}
