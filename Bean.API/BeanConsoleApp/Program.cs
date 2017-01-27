using Bean.POCO;
using Bean.DAL;
using System;
using Bean.DTO;
using System.Linq;
using System.Collections.Generic;

namespace BeanConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            //InsertBinder();
            //GetPlants();
            GetFamilies();

            Console.ReadKey();
        }

        private static void GetFamilies()
        {
            try
            {
                using (var dbContext = new BeanContext())
                {

                    List<Families> families = dbContext.Families
                                                .Include("Plants")
                                                .Include("Binder")
                                                .Where(family => family.Status == Status.Enabled).ToList()
                                                .Select(
                                                    family => new Families()
                                                    {
                                                        Name = family.Name,
                                                        Binder = family.Binder != null ? family.Binder.Description : "",
                                                        QuantityOnHand = family.Plants.Sum(plant => plant.QuantityOnHand)
                                                    }).ToList();

                    foreach (Families family in families)
                    {
                        Console.WriteLine($"Name: {family.Name}, Quantity: {family.QuantityOnHand}, Binder: {family.Binder}");
                    }

                    //Family family = dbContext.Families.FirstOrDefault(f => f.Id == 1);
                    //var quantity = 
                    //    dbContext.Plants
                    //        .GroupBy(plant => plant.FamilyId == family.Id)
                    //        .Select(group => group.Sum(plant => plant.QuantityOnHand)).ToList();

                    //Console.WriteLine(quantity);
                    var fam = dbContext.Families.Include("Plants").FirstOrDefault();
                }

                Console.WriteLine("GetFamilies completed");

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        private static void GetPlants()
        {
            Console.WriteLine("Getting plants...");

            using (var context = new BeanContext())
            {
                var plants = context.Plants.ToList();

                foreach (var plant in plants)
                {
                    Console.WriteLine(plant.Name);
                }
            }

            Console.WriteLine("Plants get.");
        }

        private static void InsertBinder()
        {
            try
            {
                Binder binder = new Binder()
                {
                    Description = "Binder1_Description",
                    Status = Status.Enabled
                };

                using (var context = new BeanContext())
                {
                    context.Database.Log = Console.WriteLine;
                    context.Binders.Add(binder);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
    }
}
