using Microsoft.EntityFrameworkCore;

namespace Foodprep.API
{
    public class DayContext : DbContext
    {
        public DbSet<Days> Days { get; set;}

        public DayContext(DbContextOptions options) : base (options)
        {
            
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var days = new List<Days>();
            int weekId = 1;
            string[] dayNames = { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };

            for (int i = 1; i <= 365; i++)
            {
                days.Add(new Days
                {
                    daysID = i,
                    day = dayNames[(i - 1) % 7],
                    weekID = weekId
                });

                // Increment weekId every 7 days
                if (i % 7 == 0)
                {
                    weekId++;
                }
            }
            //base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Days>().HasKey(m => m.daysID);
            modelBuilder.Entity<Days>().HasData(days);
        }
    }
}
