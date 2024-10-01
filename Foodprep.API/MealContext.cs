using System.Reflection.Emit;
using System;
using Microsoft.EntityFrameworkCore;

namespace Foodprep.API
{
    public class MealContext : DbContext
    {
        public DbSet <Meal> Meals { get; set; }
    public MealContext(DbContextOptions option) : base(option)
    {
    }

    override protected void OnModelCreating(ModelBuilder modelBuilder)
    {
            modelBuilder.Entity<Days>().HasKey(m => m.dayID);
        //    modelBuilder.Entity<Meal>().HasData(
          
        //);


    }
}
}

