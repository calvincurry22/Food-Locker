using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FoodLocker.Models
{
    public class Credential
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }

        [Required]
        [MaxLength(70)]
        public string Name { get; set; }

        [Required]
        public DateTime ExpirationDate { get; set; }

        public decimal RenewalFee { get; set; }

        public Employee Employee { get; set; }
    }
}
