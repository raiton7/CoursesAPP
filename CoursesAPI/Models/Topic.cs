using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CoursesAPI.Models
{
    public class Topic
    {
        [Key]
        public long Id { get; set; }

        [Column(TypeName = "nvarchar(40)")]
        public string Name { get; set; }

        [Column(TypeName = "int")]
        public int Number { get; set; }


        public long CourseId { get; set; }

        public virtual Course Course { get; set; }
    }
}
