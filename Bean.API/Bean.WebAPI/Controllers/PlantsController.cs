using Bean.DAL;
using Bean.DTO;
using Bean.POCO;
using System.Collections.Generic;
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
            var plant = dbContext.Plants.FirstOrDefault(p => p.Id == id);

            return plant;
        }

        // POST: api/Plants
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Plants/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Plants/5
        public void Delete(int id)
        {
        }
    }
}
