using FoodLocker.Data;
using FoodLocker.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodLocker.Repositories
{
    public class TaskRepository
    {
        private readonly ApplicationDbContext _context;

        public TaskRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Models.Task> GetAllTasksByUserId(int id)
        {
            return _context.Task
                    .Where(t => t.UserId == id)
                    .Include(t => t.Employee)
                    .ToList();
        }

        public Models.Task GetTaskById(int Id)
        {
            return _context.Task
                       .Include(t => t.Employee)
                       .FirstOrDefault(t => t.Id == Id);
        }

        public List<Models.Task> GetAllCompletedTasks( int userId)
        {
            return _context.Task
                        .Where(t => t.UserId == userId && t.isCompleted == true)
                        .Include(t => t.Employee)
                        .ToList();
        }

        public List<Models.Task> GetAllIncompleteTasks(int userId)
        {
            return _context.Task
                        .Where(t => t.UserId == userId && t.isCompleted == false)
                        .Include(t => t.Employee)
                        .ToList();
        }

        public void Add(Models.Task task)
        {
            _context.Add(task);
            _context.SaveChanges();
        }

        public void Update(Models.Task task)
        {
            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var task = GetTaskById(id);

            _context.Task.Remove(task);
            _context.SaveChanges();
        }
    }
}
