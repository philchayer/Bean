using Bean.DAL;
using Bean.DTO;
using Bean.POCO;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
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
            var plants = dbContext.Plants
                            .Where(plant => plant.Status == Status.Enabled)
                            .Select(
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
                            .Where(plant => plant.Status == Status.Enabled)
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
        [HttpGet]
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
                // todo: REMOVE temporary hardcoded value
                plant.Family = dbContext.Families.FirstOrDefault(family => family.Id == 1);
                plant.FamilyId = 1;
                plant.Status = Status.Enabled;




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
            try
            {
                // todo: REMOVE temporary hardcoded value
                plant.Family = dbContext.Families.FirstOrDefault(family => family.Id == 1);




                dbContext.Entry(plant).State = System.Data.Entity.EntityState.Modified;
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        // DELETE: api/Plants/5
        public void Delete(int id)
        {
            try
            {
                var plant = dbContext.Plants.FirstOrDefault(p => p.Id == id && p.Status == Status.Enabled);

                if (plant != null)
                {
                    // todo: REMOVE temporary hardcoded value
                    plant.Family = dbContext.Families.FirstOrDefault(family => family.Id == 1);
                    plant.FamilyId = 1;



                    plant.Status = Status.Deleted;
                    dbContext.Entry(plant).State = System.Data.Entity.EntityState.Modified;
                    dbContext.SaveChanges();
                }
            }
            catch (DbEntityValidationException ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }

        }
    }
}
