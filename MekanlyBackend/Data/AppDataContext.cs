using MekanlyBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace MekanlyBackend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Cafe> Cafes => Set<Cafe>();
    public DbSet<Favorite> Favorites => Set<Favorite>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Favorite>()
            .HasOne(f => f.User)
            .WithMany(u => u.Favorites)
            .HasForeignKey(f => f.UserId);

        modelBuilder.Entity<Favorite>()
            .HasOne(f => f.Cafe)
            .WithMany(c => c.Favorites)
            .HasForeignKey(f => f.CafeId);

        modelBuilder.Entity<Favorite>()
            .HasIndex(f => new { f.UserId, f.CafeId })
            .IsUnique();
    }
}