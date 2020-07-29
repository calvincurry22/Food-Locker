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

        public List<Audit> GetAllAuditsByUserId(int id)
        {
            return _context.Audit
                        .Where(a => a.UserId == id)
                        .Include(a => a.User)
                        .ToList();
        }

        public Audit GetAuditById(int id)
        {
            return _context.Audit
                    .Include(a => a.User)
                    .FirstOrDefault(a => a.Id == id);
        }

        public void Add(Audit audit)
        {
            _context.Add(audit);
            _context.SaveChanges();
        }

        public void Update(Audit audit)
        {
            _context.Entry(audit).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var audit = GetAuditById(id);

            _context.Audit.Remove(audit);
            _context.SaveChanges();
        }
    }
}
