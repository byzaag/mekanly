namespace MekanlyBackend.Models;

public class Favorite
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public int CafeId { get; set; }
    public Cafe Cafe { get; set; } = null!;
}