using FoodLocker.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodLocker.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> User { get; set; }

        public DbSet<Audit> Audit { get; set; }

        public DbSet<AuditViolation> AuditViolation { get; set; }

        public DbSet<Credential> Credential { get; set; }

        public DbSet<Employee> Employee { get; set; }

        public DbSet<Models.Task> Task { get; set; }

        public DbSet<ViolationCategory> violationCategory { get; set; }
    }
}
