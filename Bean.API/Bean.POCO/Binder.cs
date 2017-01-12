using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Bean.POCO
{
    [DataContract(IsReference = true)]
    public class Binder
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        [DataMember]
        public List<Family> Families { get; set; }

        [DataMember]
        [Required]
        public Status Status { get; set; }

    }
}
