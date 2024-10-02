using Foodprep.API;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Add services to the container.
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContext<MealContext>(options =>
            options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 21))));
        builder.Services.AddDbContext<WeekContext>(options =>
            options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 21))));
        builder.Services.AddDbContext<DayContext>(options =>
            options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 21))));

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

        //app.UseHttpsRedirection();

        app.MapGet("/api/Meals", GetAllMeals);

        app.MapGet("/api/Days", GetAllDays);

        app.MapGet("/api/Weeks", GetAllWeeks);

        app.MapGet("/api/Weeks/{id}", GetWeekById);

        app.MapGet("/api/Days/{week}", GetAllDaysByWeek);

        app.MapPost("/api/DayMeals", SaveDayMeal);

        app.Run("http://0.0.0.0:7055"); // Listen on all network interfaces


        async Task<List<Meal>> GetAllMeals(MealContext db)
        {
            return await db.Meals.ToListAsync();
        }

        async Task<List<Days>> GetAllDays(DayContext dayContext)
        {
            return await dayContext.Days.ToListAsync();
        }

        async Task<IResult> GetAllDaysByWeek(int week, DayContext dayContext)
        {
            var days = await dayContext.Days.Where(d => d.weekID == week).ToListAsync();
            return days != null ? Results.Ok(days) : Results.NotFound();
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

async Task<IResult> SaveDayMeal(DayMeal dayMeal, DayContext dayContext, MealContext mealContext)
{
    // Ensure both day and meal exist in the database
    var day = await dayContext.Days.FirstOrDefaultAsync(d => d.daysID == dayMeal.daysID);
    var meal = await mealContext.Meals.FirstOrDefaultAsync(n => n.nummer == dayMeal.mealID);

    if (day == null || meal == null)
    {
        return Results.NotFound("Day or Meal not found");
    }

    dayContext.DayMeals.Add(dayMeal); // Add the new dayMeal entry
    await dayContext.SaveChangesAsync(); // Save changes to the database

    return Results.Ok(dayMeal);
}

app.Run();