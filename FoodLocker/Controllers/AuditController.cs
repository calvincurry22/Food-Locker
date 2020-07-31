using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class AuditController : ControllerBase
    {
        private readonly AuditRepository _auditRepository;
        private readonly UserRepository _userRepository;
        public AuditController(ApplicationDbContext context)
        {
            _auditRepository = new AuditRepository(context);
            _userRepository = new UserRepository(context);
        }

        [HttpGet("getByUser/{id}")]
        public IActionResult GetAllAuditsByUserId(int id)
        {
            var user = GetCurrentUser();
            if(id == user.Id)
            {
                List<Audit> auditList = _auditRepository.GetAllAuditsByUserId(user.Id);
                if (auditList == null)
                {
                    return NotFound();
                }
                return Ok(auditList);
            } 
            else
            {
                return Unauthorized();
            }
            
        }


        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Audit audit = _auditRepository.GetAuditById(id);
            if (audit == null)
            {
                return NotFound();
            }
            return Ok(audit);
        }

        [HttpPost]
        public IActionResult Add(Audit a)
        {
            _auditRepository.Add(a);
            return CreatedAtAction("Get", new { id = a.Id }, a);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int id)
        {
            _auditRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{Id}")]
        public IActionResult Put(int id, Audit a)
        {
            if (id != a.Id)
            {
                return BadRequest();
            }
            _auditRepository.Update(a);
            return NoContent();

        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
