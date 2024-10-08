using Foodprep.API.Data;
using Microsoft.EntityFrameworkCore;

namespace Foodprep.API.Endpoints
{
    public static class MealEndpoints
    {
        public static void MapMealEndpoints(this WebApplication app)
        {
            app.MapGet("/api/Meals", GetAllMeals);
        }

        private static async Task<List<Meal>> GetAllMeals(FoodprepContext db)
        {
            return await db.Meals.ToListAsync();
        }
    }
}
