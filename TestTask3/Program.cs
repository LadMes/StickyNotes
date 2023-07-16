using Microsoft.EntityFrameworkCore;
using TestTask3.Data;
using TestTask3.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(option =>
{
    option.UseInMemoryDatabase("DotsDB");
});

builder.Services.AddScoped<IDotRepository, InMemoryDotRepository>();


var app = builder.Build();


app.MapControllers();

app.UseDefaultFiles();
app.UseStaticFiles();

MockData.SeedDatabase(app);

app.Run();
