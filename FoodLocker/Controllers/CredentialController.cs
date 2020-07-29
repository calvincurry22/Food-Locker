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
    public class CredentialController : ControllerBase
    {
        private readonly CredentialRepository _credentialRepository;
        public CredentialController(ApplicationDbContext context)
        {
            _credentialRepository = new CredentialRepository(context);
        }

        [HttpGet("getByEmployee/{id}")]
        public IActionResult GetAllAuditsByUserId(int id)
        {
            List<Credential> credentialList = _credentialRepository.GetByEmployeeId(id);
            if (credentialList == null)
            {
                return NotFound();
            }
            return Ok(credentialList);
        }


        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var credential = _credentialRepository.GetById(id);
            if (credential == null)
            {
                return NotFound();
            }
            return Ok(credential);
        }

        [HttpPost]
        public IActionResult Add(Credential c)
        {
            _credentialRepository.Add(c);
            return CreatedAtAction("Get", new { id = c.Id }, c);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int id)
        {
            _credentialRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{Id}")]
        public IActionResult Put(int id, Credential c)
        {
            if (id != c.Id)
            {
                return BadRequest();
            }
            _credentialRepository.Update(c);
            return NoContent();

        }
    }
}
