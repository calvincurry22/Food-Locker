using FoodLocker.Data;
using FoodLocker.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodLocker.Repositories
{
    public class CredentialRepository
    {
        private readonly ApplicationDbContext _context;

        public CredentialRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Credential> GetByEmployeeId(int id)
        {
            return _context.Credential
                        .Where(c => c.EmployeeId == id)
                        .Include(c => c.Employee)
                        .ToList();
        }

        public Credential GetById(int id)
        {
            return _context.Credential
                .Include(c => c.Employee)
                .FirstOrDefault(c => c.Id == id);
        }

        public void Add(Credential credential)
        {
            _context.Add(credential);
            _context.SaveChanges();
        }

        public void Update(Credential credential)
        {
            _context.Entry(credential).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var credential = GetById(id);

            _context.Credential.Remove(credential);
            _context.SaveChanges();
        }
    }
}
