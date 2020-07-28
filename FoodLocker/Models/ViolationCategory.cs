using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FoodLocker.Models
{
    public class ViolationCategory
    {
        public int Id { get; set; }

        [MaxLength(50)]
        public int Name { get; set; }
    }
}
