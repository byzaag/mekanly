namespace MekanlyBackend.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;

    public List<Favorite> Favorites { get; set; } = new();
}