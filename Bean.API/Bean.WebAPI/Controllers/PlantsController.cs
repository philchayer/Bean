using Bean.DAL;
using Bean.DTO;
using Bean.POCO;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Bean.WebAPI.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class PlantsController : ApiController
    {
        private BeanContext dbContext = new BeanContext();


        //public IEnumerable<Plant> Get()
        //{
        //    return dbContext.Plants.ToList();
        //}

        // GET: api/Plants
        [HttpGet]
        public IEnumerable<DTO_Plants> Get()
        {
            var plants = dbContext.Plants.Select(
                            plant => new DTO_Plants()
                            {
                                Id = plant.Id,
                                Name = plant.Name,
                                LatinName = plant.LatinName,
                                Family = plant.Family.Name,
                                Binder = plant.Family.Binder.Description
                            }).ToList();

            return plants;
        }

        // GET: api/Plants/search?strign
        [HttpGet]
        public IEnumerable<DTO_Plants> Get(string search)
        {
            var plants = dbContext.Plants
                            .Select(
                                plant => new DTO_Plants()
                                {
                                    Id = plant.Id,
                                    Name = plant.Name,
                                    LatinName = plant.LatinName,
                                    Family = plant.Family.Name,
                                    Binder = plant.Family.Binder.Description
                                })
                            .Where(plant => plant.Family.Contains(search));

            return plants;
        }

        // GET: api/Plants/5
        public Plant Get(int id)
        {
            Plant plant;

            if (id > 0)
            {
                plant = dbContext.Plants.FirstOrDefault(p => p.Id == id);
                plant.IsNew = false;
            }
            else
            {
                plant = dbContext.Plants.Create();
                plant.IsNew = true;
            }

            return plant;
        }

        // POST: api/Plants
        [HttpPost]
        public void Post([FromBody]Plant plant)
        {
            try
            {

                // todo: temporary hardcoded value (TO REMOVE)
                plant.Family = dbContext.Families.FirstOrDefault(family => family.Id == 1);
                plant.FamilyId = 1;
                plant.Status = Status.Enabled;


                //dbContext.Plants.Add(plant);
                dbContext.Entry(plant).State = System.Data.Entity.EntityState.Added;
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        // PUT: api/Plants/5
        [HttpPut]
        public void Put(int id, [FromBody]Plant plant)
        {
            dbContext.Plants.Add(plant);
            dbContext.SaveChanges();
        }

        // DELETE: api/Plants/5
        public void Delete(int id)
        {
        }
    }
}
