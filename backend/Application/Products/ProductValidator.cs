using FluentValidation;

namespace Application;

public class ProductValidator : AbstractValidator<ProductRequest>
{
    public ProductValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .NotNull()
            .WithMessage("Enter a Name for the product");
        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .NotNull()
            .WithMessage("Select a Category for the product");
        RuleFor(x => x.Description)
            .NotEmpty()
            .NotNull()
            .WithMessage("Enter a Description for the product");
    }
}
