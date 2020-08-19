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
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeRepository _employeeRepository;
        public EmployeeController(ApplicationDbContext context)
        {
            _employeeRepository = new EmployeeRepository(context);
        }

        [HttpGet("getByUser/{id}")]
        public async Task<IActionResult> GetAllEmployeesByUserId(int id)
        {
            List<Employee> employeeList = await _employeeRepository.GetAllEmployeesByUserId(id);
            if (employeeList == null)
            {
                return NotFound();
            }
            return Ok(employeeList);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _employeeRepository.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPost]
        public IActionResult Add(Employee e)
        {
            _employeeRepository.Add(e);
            return CreatedAtAction("Get", new { id = e.Id }, e);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int id)
        {
            _employeeRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{Id}")]
        public IActionResult Put(int id, Employee e)
        {
            if (id != e.Id)
            {
                return BadRequest();
            }
            _employeeRepository.Update(e);
            return NoContent();
        }
    }
}
