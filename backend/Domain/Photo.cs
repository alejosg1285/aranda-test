using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

[NotMapped]
public class Photo
{
    public string Id { get; set; }
    public string Url { get; set; }
}
