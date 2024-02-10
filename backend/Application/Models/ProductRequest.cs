namespace Application;

public class ProductRequest
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? PhotoUrl { get; set; }
    public int CategoryId { get; set; }
}
