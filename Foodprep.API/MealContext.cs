using System.Reflection.Emit;
using System;
using Microsoft.EntityFrameworkCore;

namespace Foodprep.API
{
    // MealContext is a class that inherits from DbContext
    public class MealContext : DbContext
    {
        // DbSet is a collection of entities that can be queried
        public DbSet<Meal> Meals { get; set; }

        public MealContext(DbContextOptions<MealContext> options) : base(options)
        {
        }

        // OnModelCreating is a method that is called when the model for a derived context has been initialized
        override protected void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Meal>().HasKey(m => m.nummer);
            // modelBuilder.Entity<Meal>().HasData(
            // );
        }
    }
}