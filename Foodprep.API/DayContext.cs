using Microsoft.EntityFrameworkCore;

namespace Foodprep.API
{
    public class DayContext : DbContext
    {
        public DbSet<Days> Days { get; set;}
        public DbSet<DayMeal> DayMeals { get; set; }


        public DayContext(DbContextOptions options) : base (options)
        {
            
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //modelBuilder.Entity<Days>().HasKey(m => m.daysID);
            modelBuilder.Entity<DayMeal>().HasKey(dm => new { dm.daysID, dm.mealID }); // Configure composite primary key
        }
    }
}
