using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodLocker.Data;
using FoodLocker.Models;
using FoodLocker.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodLocker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuditViolationController : ControllerBase
    {
        private readonly AuditViolationRepository _auditViolationRepository;
        public AuditViolationController(ApplicationDbContext context)
        {
            _auditViolationRepository = new AuditViolationRepository(context);
        }

        [HttpGet("getByAudit/{id}")]
        public IActionResult GetAllByAuditId(int id)
        {
            List<AuditViolation> avList = _auditViolationRepository.GetByAuditId(id);
            if (avList == null)
            {
                return NotFound();
            }
            return Ok(avList);
        }


        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            AuditViolation av = _auditViolationRepository.GetById(id);
            if (av == null)
            {
                return NotFound();
            }
            return Ok(av);
        }

        [HttpPost]
        public IActionResult Add(AuditViolation av)
        {
            _auditViolationRepository.Add(av);
            return CreatedAtAction("Get", new { id = av.Id }, av);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int id)
        {
            _auditViolationRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{Id}")]
        public IActionResult Put(int id, AuditViolation av)
        {
            if (id != av.Id)
            {
                return BadRequest();
            }
            _auditViolationRepository.Update(av);
            return NoContent();
        }
    }
}
