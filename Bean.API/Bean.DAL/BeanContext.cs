using Bean.POCO;
using System.Data.Entity;

namespace Bean.DAL
{
    public class BeanContext : DbContext
    {
        #region constants

        private const string DB_NAME = "Bean";
        
        #endregion constants

        #region properties

        public DbSet<Binder> Binders { get; set; }

        public DbSet<Family> Families { get; set; }

        public DbSet<Plant> Plants { get; set; }

        #endregion properties

        #region constructors

        public BeanContext() : base(DB_NAME)
        {

        }

        #endregion constructors

        #region private methods


        #endregion  private methods

    }
}
