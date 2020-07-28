using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FoodLocker.Models
{
    public class Audit
    {
        public int Id { get; set; }

        [MaxLength(50)]
        public string AuditorName { get; set; }

        [Required]
        public DateTime AuditDate { get; set; }

        [Required]
        public int Score { get; set; }

        public bool Passed { get; set; }

        [Required]
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
