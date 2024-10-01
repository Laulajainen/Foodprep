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
builder.Services.AddDbContext<WeekContext>(o => o.UseMySql(connectionString,
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

app.MapGet("/api/Meals", GetAllMeals);

app.MapGet("/api/Weeks", GetAllWeeks);

app.MapGet("/api/Weeks/{id}", GetWeekById);

async Task<List<Meal>> GetAllMeals(MealContext db)
{
    return await db.Meals.ToListAsync();
}

async Task<List<Week>> GetAllWeeks(WeekContext db)
{
    return await db.Weeks.ToListAsync();
}

async Task<IResult> GetWeekById(int id, WeekContext db)
{
    var week = await db.Weeks.FindAsync(id);
    return week != null ? Results.Ok(week) : Results.NotFound();
}

app.Run();