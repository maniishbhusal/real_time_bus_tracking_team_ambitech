using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Bus> Buses { get; set; }
        public DbSet<BusLocation> BusLocations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Make RegistrationNumber unique
            modelBuilder.Entity<Bus>()
                .HasIndex(b => b.RegistrationNumber)
                .IsUnique();

            // Configure one-to-many relationship
            // modelBuilder.Entity<Bus>()
            //     .HasMany(b => b.Locations)
            //     .WithOne(l => l.Bus)
            //     .HasForeignKey(l => l.BusId)
            //     .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

