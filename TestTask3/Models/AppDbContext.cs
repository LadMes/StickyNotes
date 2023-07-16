using Microsoft.EntityFrameworkCore;

namespace TestTask3.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Dot> Dots { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Dot>().Navigation(d => d.Comments).AutoInclude();
        }
    }
}
