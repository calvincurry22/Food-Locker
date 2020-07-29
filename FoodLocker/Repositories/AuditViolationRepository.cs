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

        public List<AuditViolation> GetByAuditId(int id)
        {
            return _context.AuditViolation
                        .Where(a => a.AuditId == id)
                        .Include(a => a.ViolationCategory)
                        .ToList();
        }

        public AuditViolation GetById(int id)
        {
            return _context.AuditViolation
                .Include(a => a.ViolationCategory)
                .FirstOrDefault(a => a.Id == id);
        }

        public void Add(AuditViolation auditViolation)
        {
            _context.Add(auditViolation);
            _context.SaveChanges();
        }

        public void Update(AuditViolation auditViolation)
        {
            _context.Entry(auditViolation).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var auditViolation = GetById(id);

            _context.AuditViolation.Remove(auditViolation);
            _context.SaveChanges();
        }
    }
}
