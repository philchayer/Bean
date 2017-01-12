namespace Bean.DAL.Migrations
{
    using POCO;
    using System;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Validation;
    using System.Diagnostics;

    internal sealed class Configuration : DbMigrationsConfiguration<BeanContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BeanContext context)
        {
            try
            {

                //add or update binders
                context.Binders.AddOrUpdate(binder => binder.Id,
                    new Binder()
                    {
                        Id = 1,
                        Description = "Blue",
                        Status = Status.Enabled
                    },
                    new Binder()
                    {
                        Id = 2,
                        Description = "Green",
                        Status = Status.Enabled
                    },
                    new Binder()
                    {
                        Id = 3,
                        Description = "Pink",
                        Status = Status.Enabled
                    },
                    new Binder()
                    {
                        Id = 4,
                        Description = "Spotted",
                        Status = Status.Enabled
                    });

                //add or update families
                Family Solanaceae = new Family()
                {
                    Id = 1,
                    BinderId = 3,
                    Name = "Solanaceae",
                    Status = Status.Enabled
                };
                context.Families.AddOrUpdate(f => f.Id, Solanaceae);

                Family Brassicaceae = new Family()
                {
                    Id = 2,
                    Name = "Brassicaceae",
                    Status = Status.Enabled
                };
                context.Families.AddOrUpdate(f => f.Id, Brassicaceae);

                //add or update plants
                context.Plants.AddOrUpdate(plant => plant.Id,
                    new Plant()
                    {
                        Id = 1,
                        FamilyId = 1,
                        Family = Solanaceae,
                        Name = "Tomate cerise 'Honeybee'",
                        PlantingIN = new DateTime(2016, 03, 25),
                        Status = Status.Enabled
                    });

                context.Plants.AddOrUpdate(plant => plant.Id,
                    new Plant()
                    {
                        Id = 2,
                        FamilyId = 2,
                        Family = Brassicaceae,
                        Name = "Chou 'Loughton'",
                        DistanceBetweenPlants = 18,
                        DistanceBetweenRows = 24,
                        IsColdHardy = true,
                        Status = Status.Enabled
                    });

                context.SaveChanges();

            }
            catch (DbEntityValidationException ex)
            {
                foreach (DbEntityValidationResult result in ex.EntityValidationErrors)
                {
                    Debug.Write($"Entity of type {result.Entry.Entity.GetType().Name} in state {result.Entry.State} has the following validation errors:");

                    foreach (var validationError in result.ValidationErrors)
                        Debug.Write($"- Property: {validationError.PropertyName}, " +
                            $"Value: {result.Entry.CurrentValues.GetValue<object>(validationError.PropertyName)}, Error: {validationError.ErrorMessage}");
                }

                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unhandle exception {ex.ToString()}");
                throw;
            }
        }
    }
}
