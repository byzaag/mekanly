using MekanlyBackend.Data;
using MekanlyBackend.DTOs;
using MekanlyBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MekanlyBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var exists = await _context.Users.AnyAsync(x => x.Email == dto.Email);

        if (exists)
            return BadRequest(new { message = "Email zaten kayıtlı" });

        var user = new User
        {
            Email = dto.Email,
            Password = dto.Password
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == dto.Email && x.Password == dto.Password);

        if (user == null)
            return Unauthorized(new { message = "Email veya şifre yanlış" });

        return Ok(user);
    }
}