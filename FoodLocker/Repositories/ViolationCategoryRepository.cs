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

        public List<ViolationCategory> GetAll()
        {
            return _context.ViolationCategory
                            .ToList();
        }

        public ViolationCategory GetById(int id)
        {
            return _context.ViolationCategory
                    .FirstOrDefault(vc => vc.Id == id);
        }
    }
}
