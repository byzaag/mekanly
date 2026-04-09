using MekanlyBackend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MekanlyBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CafesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CafesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var cafes = await _context.Cafes.ToListAsync();
        return Ok(cafes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var cafe = await _context.Cafes.FindAsync(id);

        if (cafe == null)
            return NotFound(new { message = "Cafe bulunamadı" });

        return Ok(cafe);
    }
}