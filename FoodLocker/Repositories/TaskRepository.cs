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

        public async Task<List<Models.Task>> GetAllTasksByUserId(int id)
        {
            return await _context.Task
                    .Where(t => t.UserId == id)
                    .Include(t => t.Employee)
                    .ToListAsync();
        }

        public async Task<Models.Task> GetTaskById(int Id)
        {
            return await _context.Task
                       .Include(t => t.Employee)
                       .FirstOrDefaultAsync(t => t.Id == Id);
        }

        public async Task<List<Models.Task>> GetAllCompletedTasks( int userId)
        {
            return await _context.Task
                        .Where(t => t.UserId == userId && t.isCompleted == true)
                        .Include(t => t.Employee)
                        .ToListAsync();
        }

        public async Task<List<Models.Task>> GetAllIncompleteTasks(int userId)
        {
            return await _context.Task
                        .Where(t => t.UserId == userId && t.isCompleted == false)
                        .Include(t => t.Employee)
                        .ToListAsync();
        }

        public async void Add(Models.Task task)
        {
            _context.Add(task);
            await _context.SaveChangesAsync();
        }

        public async void Update(Models.Task task)
        {
            _context.Entry(task).State = EntityState.Modified;
           await _context.SaveChangesAsync();
        }

        public async void Delete(int id)
        {
            var task = await GetTaskById(id);

            _context.Task.Remove(task);
            await _context.SaveChangesAsync();
        }
    }
}
