using Foodprep.API;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<MealContext>(o => o.UseMySql(connectionString,
    new MySqlServerVersion(new Version(8, 0, 21))));

builder.Services.AddDbContext<DayContext>(options => options.UseMySql(connectionString,
    new MySqlServerVersion(new Version(8, 0, 21))));


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();

// Get all meals
app.MapGet("/api/Meals", GetAllMeals);
app.MapGet("/api/Days", GetAllDays);

// Method that returns all meals
async Task<List<Meal>> GetAllMeals(MealContext db) 
{
    return await db.Meals.ToListAsync();
}

async Task<List<Days>> GetAllDays(DayContext dayContext)
{
    return await dayContext.Days.ToListAsync();
}

app.Run();
