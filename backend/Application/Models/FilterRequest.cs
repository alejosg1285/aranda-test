namespace Application;

public class FilterRequest
{
    public FilterByEnum FilterBy { get; set; }
    public string? FilterValue { get; set; }
    public OrderByEnum OrderBy { get; set; }
    public DirectionOrderEnum DirectionOrder { get; set; }
}
