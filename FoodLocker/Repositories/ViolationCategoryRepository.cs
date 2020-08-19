using FoodLocker.Data;
using FoodLocker.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodLocker.Repositories
{
    public class ViolationCategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public ViolationCategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ViolationCategory>> GetAll()
        {
            return await _context.ViolationCategory
                            .ToListAsync();
        }

        public async Task<ViolationCategory> GetById(int id)
        {
            return await _context.ViolationCategory
                    .FirstOrDefaultAsync(vc => vc.Id == id);
        }
    }
}
