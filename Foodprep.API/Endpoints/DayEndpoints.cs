using Foodprep.API.Data;
using Microsoft.EntityFrameworkCore;

namespace Foodprep.API.Endpoints
{
    public static class DayEndpoints
    {
        public static void MapDayEndpoints(this WebApplication app)
        {
            app.MapGet("/api/Days", GetAllDays);
            app.MapGet("/api/Days/{week}", GetAllDaysByWeek);
            app.MapPost("/api/DayMeals", SaveDayMeal);
        }

        private static async Task<List<Days>> GetAllDays(FoodprepContext db)
        {
            return await db.Days.ToListAsync();
        }

        private static async Task<IResult> GetAllDaysByWeek(int week, FoodprepContext db)
        {
            var days = await db.Days.Where(d => d.WeekID == week).ToListAsync();
            return days != null ? Results.Ok(days) : Results.NotFound();
        }

        private static async Task<IResult> SaveDayMeal(DayMeal dayMeal, FoodprepContext db)
        {
            // Ensure both day and meal exist in the database
            var day = await db.Days.FirstOrDefaultAsync(d => d.DaysID == dayMeal.DaysID);
            var meal = await db.Meals.FirstOrDefaultAsync(n => n.MealId == dayMeal.MealID);

            if (day == null || meal == null)
            {
                return Results.NotFound("Day or Meal not found");
            }

            db.DayMeals.Add(dayMeal); // Add the new dayMeal entry
            await db.SaveChangesAsync(); // Save changes to the database

            return Results.Ok(dayMeal);
        }
    }
}
