using Bean.DAL;
using Bean.DTO;
using Bean.POCO;
using System;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;

namespace Bean.WebAPI.Controllers
{
    public class PlantsController : ApiController
    {
        private BeanContext dbContext = new BeanContext();

        // GET: api/Plants
        [HttpGet]
        [ResponseType(typeof(Plants))]
        public IHttpActionResult Get()
        {
            try
            {
                var plants = dbContext.Plants
                                .Where(plant => plant.Status == Status.Enabled)
                                .Select(
                                    plant => new Plants()
                                    {
                                        Id = plant.Id,
                                        PlantName = plant.Name,
                                        LatinName = plant.LatinName == null ? "" : plant.LatinName,
                                        Species = plant.Species,
                                        Family = plant.Family.Name,
                                        Binder = plant.Family.Binder.Description == null ? "" : plant.Family.Binder.Description,
                                        QuantityOnHand = plant.QuantityOnHand
                                    }).ToList();

                return Ok(plants);

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
                throw;
            }
        }

        // GET: api/Plants/search?string
        [HttpGet]
        [ResponseType(typeof(Plants))]
        public IHttpActionResult Get(string search)
        {
            try
            {
                var plants = dbContext.Plants
                           .Where(plant => plant.Status == Status.Enabled)
                           .Select(
                               plant => new Plants()
                               {
                                   Id = plant.Id,
                                   PlantName = plant.Name,
                                   LatinName = plant.LatinName == null ? "" : plant.LatinName,
                                   Species = plant.Species,
                                   Family = plant.Family.Name,
                                   Binder = plant.Family.Binder.Description == null ? "" : plant.Family.Binder.Description,
                                   QuantityOnHand = plant.QuantityOnHand
                               })
                           .Where(plant => plant.Family.Contains(search));

                return Ok(plants);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // GET: api/Plants/5
        [HttpGet]
        [ResponseType(typeof(Plant))]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Plant plant;

                if (id > 0)
                {
                    plant = dbContext.Plants.FirstOrDefault(p => p.Id == id);
                    if (plant == null)
                        return NotFound();

                    plant.IsNew = false;
                }
                else
                {
                    plant = dbContext.Plants.Create();
                    plant.IsNew = true;
                    plant.Status = Status.Enabled;
                }

                return Ok(plant);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/Plants/5
        [Authorize]
        [HttpPut]
        [ResponseType(typeof(Plant))]
        public IHttpActionResult Put(int id, [FromBody]Plant plant)
        {
            try
            {
                // todo: REMOVE temporary hardcoded value
                plant.Family = dbContext.Families.FirstOrDefault(family => family.Id == 1);



                // validation
                if (plant == null)
                    return BadRequest("Plant cannot be null");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                dbContext.Entry(plant).State = System.Data.Entity.EntityState.Modified;
                dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return InternalServerError(ex);
            }
        }

        // POST: api/Plants
        [Authorize]
        [HttpPost]
        [ResponseType(typeof(Plant))]
        public IHttpActionResult Post([FromBody]Plant plant)
        {
            try
            {
                // todo: REMOVE temporary hardcoded value
                plant.Family = dbContext.Families.FirstOrDefault(family => family.Id == 1);
                plant.FamilyId = 1;
                plant.Status = Status.Enabled;



                // validation
                if (plant == null)
                    return BadRequest("Plant cannot be null");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                dbContext.Entry(plant).State = System.Data.Entity.EntityState.Added;
                dbContext.SaveChanges();

                return Created<Plant>(Request.RequestUri + plant.Id.ToString(), plant);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Plants/5
        [Authorize]
        [HttpDelete]
        [ResponseType(typeof(Plant))]
        public IHttpActionResult Delete(int id)
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
                else
                    return NotFound();

                return Ok();
            }
            catch (DbEntityValidationException ex)
            {
                Debug.WriteLine(ex);
                return InternalServerError(ex);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return InternalServerError(ex);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                dbContext.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
