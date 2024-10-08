using Foodprep.API.Data;
using Microsoft.EntityFrameworkCore;

namespace Foodprep.API.Endpoints
{
    public static class WeekEndpoints
    {
        public static void MapWeekEndpoints(this WebApplication app)
        {
            app.MapGet("/api/Weeks", GetAllWeeks);
            app.MapGet("/api/Weeks/{id}", GetWeekById);
        }

        private static async Task<List<Week>> GetAllWeeks(FoodprepContext db)
        {
            return await db.Weeks.ToListAsync();
        }

        private static async Task<IResult> GetWeekById(int id, FoodprepContext db)
        {
            var week = await db.Weeks.FindAsync(id);
            return week != null ? Results.Ok(week) : Results.NotFound();
        }
    }
}
