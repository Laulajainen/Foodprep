using Microsoft.EntityFrameworkCore;
namespace Foodprep.API
{
    public class WeekContext : DbContext
    {
        public WeekContext(DbContextOptions<WeekContext> options) : base(options)
        {
        }

    public DbSet<Week> Weeks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Week>().ToTable("weeks");
            modelBuilder.Entity<Week>().HasKey(w => w.WeekID);
        }
    }
}
