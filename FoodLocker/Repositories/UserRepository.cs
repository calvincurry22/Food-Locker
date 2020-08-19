using FoodLocker.Data;
using FoodLocker.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodLocker.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAll()
        {
            return await _context.User
                        .ToListAsync();
        }
        public async Task<User> GetByFirebaseUserId(string firebaseUserId)
        {
            return await _context.User
                .FirstOrDefaultAsync(u => u.FirebaseUserId == firebaseUserId);
        }

        public async void Add(User user)
        {
            _context.Add(user);
           await _context.SaveChangesAsync();
        }

        public async void Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
