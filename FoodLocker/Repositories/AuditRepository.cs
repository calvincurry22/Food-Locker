using FoodLocker.Data;
using FoodLocker.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodLocker.Repositories
{
    public class AuditRepository
    {
        private readonly ApplicationDbContext _context;

        public AuditRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Audit>> GetAllAuditsByUserId(int id)
        {
            return await _context.Audit
                        .Where(a => a.UserId == id)
                        .Include(a => a.User)
                        .OrderBy(a => a.AuditDate)
                        .ToListAsync();
        }

        public async Task<Audit> GetAuditById(int id)
        {
            return await _context.Audit
                    .Include(a => a.User)
                    .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async void Add(Audit audit)
        {
            await _context.AddAsync(audit);
            await _context.SaveChangesAsync();
        }

        public async void Update(Audit audit)
        {
            _context.Entry(audit).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async void Delete(int id)
        {
            var audit = await GetAuditById(id);

            _context.Audit.Remove(audit);
            await _context.SaveChangesAsync();
        }
    }
}
