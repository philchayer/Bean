using Bean.POCO;
using Bean.DAL;
using System;
using Bean.DTO;
using System.Linq;

namespace BeanConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            //InsertBinder();
            Get();

            Console.ReadKey();
        }

        private static void Get()
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
