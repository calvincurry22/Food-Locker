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

        public async Task<List<Credential>> GetByEmployeeId(int id)
        {
            return await _context.Credential
                        .Where(c => c.EmployeeId == id)
                        .Include(c => c.Employee)
                        .ToListAsync();
        }

        public async Task<Credential> GetById(int id)
        {
            return await _context.Credential
                .Include(c => c.Employee)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async void Add(Credential credential)
        {
            _context.Add(credential);
           await _context.SaveChangesAsync();
        }

        public async void Update(Credential credential)
        {
            _context.Entry(credential).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async void Delete(int id)
        {
            var credential = await GetById(id);

            _context.Credential.Remove(credential);
            await _context.SaveChangesAsync();
        }
    }
}
