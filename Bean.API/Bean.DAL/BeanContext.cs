using Bean.POCO;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Bean.DAL
{
    public class BeanContext: DbContext
    {
        public DbSet<Binder> Binders { get; set; }

        public DbSet<Family> Families { get; set; }

        public DbSet<Plant> Plants { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("pla");

            base.OnModelCreating(modelBuilder);
        }
    }
}
