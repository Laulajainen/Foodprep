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
            
            modelBuilder.Entity<Days>().HasKey(m => m.daysID);
            
        }
    }
}
