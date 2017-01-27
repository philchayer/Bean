using Bean.DAL;
using Bean.DTO;
using Bean.POCO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

namespace Bean.WebAPI.Controllers
{
    /// <summary>
    /// The controller for plant Family and Families
    /// </summary>
    public class FamiliesController : ApiController
    {
        private BeanContext dbContext = new BeanContext();

        /// <summary>
        /// Get all the families. 
        /// </summary>
        /// <example>GET: api/Families</example>
        /// <returns>All families of type Families</returns>
        [HttpGet]
        [ResponseType(typeof(Families))]
        public IHttpActionResult Get()
        {
            try
            {
                List<Families> families = dbContext.Families
                                            .Include("Plants").Include("Binder")
                                            .Where(family => family.Status == Status.Enabled).ToList()
                                            .Select(
                                                family => new Families()
                                                {
                                                    Id = family.Id,
                                                    Name = family.Name,
                                                    Binder = family.Binder != null && family.Binder.Description != null ? family.Binder.Description : "",
                                                    QuantityOnHand = family.Plants.Sum(plant => plant.QuantityOnHand)
                                                })
                                                .OrderBy(family => family.Name).ToList();

                return Ok(families);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // GET: api/Families/5
        [ResponseType(typeof(Family))]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Family family;

                if (id > 0)
                {
                    family = dbContext.Families.FirstOrDefault(f => f.Id == id && f.Status == Status.Enabled);

                    if (family == null)
                        return NotFound();

                    family.IsNew = false;
                }
                else
                {
                    family = dbContext.Families.Create();
                    family.IsNew = true;
                    family.Status = Status.Enabled;
                }

                return Ok(family);
            }
            catch (Excep­tion ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/Families/5
        [Authorize]
        [HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult Put(int id, Family family)
        {
            //validation
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (family == null)
                return BadRequest("Family cannot be null");

            if (id != family.Id)
                return BadRequest();

            dbContext.Entry(family).State = EntityState.Modified;

            try
            {
                dbContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FamilyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Families
        [Authorize]
        [HttpPost]
        [ResponseType(typeof(Family))]
        public IHttpActionResult Post­(Family family)
        {
            try
            {
                // validation
                if (family == null)
                    return BadRequest("Family cannot be null");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                dbContext.Families.Add(family);
                dbContext.SaveChanges();

                return Created<Family>(Request.RequestUri + family.Id.ToString(), family);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Families/5
        [Authorize]
        [HttpDelete]
        [ResponseType(typeof(Family))]
        public IHttpActionResult Delete(int id)
        {
            Family family = dbContext.Families.FirstOrDefault(f => f.Id == id && f.Status == Status.Enabled);

            if (family == null)
                return NotFound();

            family.Status = Status.Deleted;
            dbContext.Entry(family).State = EntityState.Modified;
            dbContext.SaveChanges();

            return Ok(family);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                dbContext.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FamilyExists(int id)
        {
            return dbContext.Families.Count(e => e.Id == id) > 0;
        }
    }
}