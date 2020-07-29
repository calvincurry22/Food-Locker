using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodLocker.Data;
using FoodLocker.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodLocker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskRepository _taskRepository;
        public TaskController(ApplicationDbContext context)
        {
            _taskRepository = new TaskRepository(context);
        }

        [HttpGet("getByUser/{id}")]
        public IActionResult GetAllTasksByUserId(int id)
        {
            List<Models.Task> taskList = _taskRepository.GetAllTasksByUserId(id);
            if (taskList == null)
            {
                return NotFound();
            }
            return Ok(taskList);
        }


        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var task = _taskRepository.GetTaskById(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpGet("completedTasksByUser/{id}")]
        public IActionResult GetCompletedTasksByUserId(int id)
        {
            var list = _taskRepository.GetAllCompletedTasks(id);
            if (list == null)
            {
                return NotFound();
            }
            return Ok(list);
        }

        [HttpGet("incompleteTasksByUser/{id}")]
        public IActionResult GetIncompleteTasksByUserId(int id)
        {
            var list = _taskRepository.GetAllIncompleteTasks(id);
            if (list == null)
            {
                return NotFound();
            }
            return Ok(list);
        }

        [HttpPost]
        public IActionResult Add(Models.Task t)
        {
            t.CreationDate = DateTime.Now;
            t.isCompleted = false;

            _taskRepository.Add(t);
            return CreatedAtAction("Get", new { id = t.Id }, t);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int id)
        {
            _taskRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{Id}")]
        public IActionResult Put(int id, Models.Task t)
        {
            if (id != t.Id)
            {
                return BadRequest();
            }
            _taskRepository.Update(t);
            return NoContent();
        }
    }
}
