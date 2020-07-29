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

        public List<Employee> GetAllEmployeesByUserId(int id)
        {
            return _context.Employee
                        .Where(e => e.UserId == id)
                        .ToList();
        }

        public Employee GetById(int id)
        {
            return _context.Employee
                .FirstOrDefault(e => e.Id == id);
        }

        public void Add(Employee e)
        {
            _context.Add(e);
            _context.SaveChanges();
        }

        public void Update(Employee e)
        {
            _context.Entry(e).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var employee = GetById(id);

            _context.Employee.Remove(employee);
            _context.SaveChanges();
        }
    }
}
