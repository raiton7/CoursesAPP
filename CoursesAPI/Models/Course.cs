using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CoursesAPI.Models
{
    public class Course
    {
        [Key]
        public long Id { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Name { get; set; }

        [Column(TypeName = "ntext")]
        public string Details { get; set; }


        public virtual ICollection<Topic> Topics { get; set; }
    }
}
