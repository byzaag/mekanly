using MekanlyBackend.Data;
using Microsoft.EntityFrameworkCore;
using MekanlyBackend.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!context.Cafes.Any())
    {
        context.Cafes.AddRange(
            new Cafe
            {
                Name = "Minoa Pera",
                District = "Beyoğlu",
                Neighborhood = "Asmalımescit",
                Description = "Kitaplarla çevrili sakin bir çalışma kafesi.",
                Rating = 4.7,
                Address = "Beyoğlu / İstanbul",
                Latitude = 41.0319,
                Longitude = 28.9744,
                IsOpen = true
            },
            new Cafe
            {
                Name = "Story Coffee",
                District = "Kadıköy",
                Neighborhood = "Yeldeğirmeni",
                Description = "Öğrenciler için uygun, sessiz ve rahat.",
                Rating = 4.8,
                Address = "Kadıköy / İstanbul",
                Latitude = 40.9924,
                Longitude = 29.0322,
                IsOpen = true
            },
            new Cafe
            {
                Name = "Cup of Joy",
                District = "Beşiktaş",
                Neighborhood = "Akaretler",
                Description = "Modern ve sosyal atmosferli popüler kahve noktası.",
                Rating = 4.5,
                Address = "Beşiktaş / İstanbul",
                Latitude = 41.0439,
                Longitude = 29.0053,
                IsOpen = true
            }
        );

        context.SaveChanges();
    }
}
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();