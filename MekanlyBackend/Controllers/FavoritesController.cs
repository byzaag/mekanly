using MekanlyBackend.Data;
using MekanlyBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MekanlyBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FavoritesController : ControllerBase
{
    private readonly AppDbContext _context;

    public FavoritesController(AppDbContext context)
    {
        _context = context;
    }

    // Kullanıcının favorileri
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserFavorites(int userId)
    {
        var favorites = await _context.Favorites
            .Where(f => f.UserId == userId)
            .Include(f => f.Cafe)
            .Select(f => f.Cafe)
            .ToListAsync();

        return Ok(favorites);
    }

    // Favori ekleme
    [HttpPost]
    public async Task<IActionResult> AddFavorite(int userId, int cafeId)
    {
        var exists = await _context.Favorites
            .AnyAsync(f => f.UserId == userId && f.CafeId == cafeId);

        if (exists)
            return BadRequest(new { message = "Zaten favori" });

        var favorite = new Favorite
        {
            UserId = userId,
            CafeId = cafeId
        };

        _context.Favorites.Add(favorite);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Favoriye eklendi" });
    }

    // Favoriden çıkar
    [HttpDelete]
    public async Task<IActionResult> RemoveFavorite(int userId, int cafeId)
    {
        var favorite = await _context.Favorites
            .FirstOrDefaultAsync(f => f.UserId == userId && f.CafeId == cafeId);

        if (favorite == null)
            return NotFound();

        _context.Favorites.Remove(favorite);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Silindi" });
    }
}