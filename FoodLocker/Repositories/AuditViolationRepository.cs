using FoodLocker.Data;
using FoodLocker.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodLocker.Repositories
{
    public class AuditViolationRepository
    {
        private readonly ApplicationDbContext _context;

        public AuditViolationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<AuditViolation>> GetByAuditId(int id)
        {
            return await _context.AuditViolation
                        .Where(a => a.AuditId == id)
                        .Include(a => a.ViolationCategory)
                        .ToListAsync();
        }

        public async Task<AuditViolation> GetById(int id)
        {
            return await _context.AuditViolation
                .Include(a => a.ViolationCategory)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async void Add(AuditViolation auditViolation)
        {
           await _context.AddAsync(auditViolation);
           await _context.SaveChangesAsync();
        }

        public async void Update(AuditViolation auditViolation)
        {
            _context.Entry(auditViolation).State = EntityState.Modified;
           await _context.SaveChangesAsync();
        }

        public async void Delete(int id)
        {
            var auditViolation = await GetById(id);

            _context.AuditViolation.Remove(auditViolation);
            await _context.SaveChangesAsync();
        }
    }
}
