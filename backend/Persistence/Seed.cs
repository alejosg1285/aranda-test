using Domain;

namespace Persistence;

public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (context.Categories.Any()) return;

        var categories = new List<Category>
        {
            new Category { Name = "Vehículos" },
            new Category { Name = "Mascotas" },
            new Category { Name = "Cuidado Personal" },
            new Category { Name = "Deportes y Fitness" },
            new Category { Name = "Electrodomésticos" },
            new Category { Name = "Tecnologia" },
            new Category { Name = "Libros, Revistas y Comics" }
        };

        await context.Categories.AddRangeAsync(categories);
        await context.SaveChangesAsync();
    }
}
