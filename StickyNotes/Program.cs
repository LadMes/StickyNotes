using Microsoft.EntityFrameworkCore;
using TestTask3.Data;
using TestTask3.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(option =>
{
    option.UseNpgsql(builder.Configuration.GetConnectionString("StickyNotesPostgres"));
});

builder.Services.AddScoped<IStickyNoteRepository, PostgresStickyNoteRepository>();


var app = builder.Build();


app.MapControllers();

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();
