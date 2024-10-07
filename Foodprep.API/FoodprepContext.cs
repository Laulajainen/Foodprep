using System;
using Microsoft.EntityFrameworkCore;
using Foodprep.API.Data;

namespace Foodprep.API
{
    public class FoodprepContext : DbContext
    {
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Week> Weeks { get; set; }
        public DbSet<Days> Days { get; set; }
        public DbSet<DayMeal> DayMeals { get; set; }

        public FoodprepContext(DbContextOptions<FoodprepContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Meal entity
            modelBuilder.Entity<Meal>().HasKey(m => m.MealId);

            // Configure Week entity
            modelBuilder.Entity<Week>().ToTable("weeks");
            modelBuilder.Entity<Week>().HasKey(w => w.WeekID);

            // Configure DayMeal entity with composite primary key
            modelBuilder.Entity<DayMeal>().HasKey(dm => new { dm.DaysID, dm.MealID });

            // Additional configurations can be added here
        }
    }
}