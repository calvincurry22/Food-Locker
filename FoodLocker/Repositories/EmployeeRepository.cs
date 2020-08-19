using FoodLocker.Data;
using FoodLocker.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodLocker.Repositories
{
    public class EmployeeRepository
    {
        private readonly ApplicationDbContext _context;

        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetAllEmployeesByUserId(int id)
        {
            return await _context.Employee
                        .Where(e => e.UserId == id)
                        .ToListAsync();
        }

        public async Task<Employee> GetById(int id)
        {
            return await _context.Employee
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async void Add(Employee e)
        {
            _context.Add(e);
            await _context.SaveChangesAsync();
        }

        public async void Update(Employee e)
        {
            _context.Entry(e).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async void Delete(int id)
        {
            var employee = await GetById(id);

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();
        }
    }
}
