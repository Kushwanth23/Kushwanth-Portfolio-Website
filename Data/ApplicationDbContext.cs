using Microsoft.EntityFrameworkCore;
using Kushwanth_Portfolio_Website.Models;

namespace Kushwanth_Portfolio_Website.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasKey(e => e.Id);
            });
        }
    }
}
