using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FoodLocker.Models
{
    public class AuditViolation
    {
        public int Id { get; set; }

        [Required]
        public int AuditId { get; set; }

        [Required]
        public bool IsCritical { get; set; }

        [Required]
        public int ViolationCategoryId { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        public ViolationCategory ViolationCategory { get; set; }
    }
}
