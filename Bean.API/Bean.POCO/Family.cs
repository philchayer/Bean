using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Bean.POCO
{
    [DataContract(IsReference = true)]
    public class Family : BasePOCO
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        public int? BinderId { get; set; }

        [DataMember]
        [ForeignKey("BinderId")]
        public Binder Binder { get; set; }

        [DataMember]
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [DataMember]
        public List<Plant> Plants { get; set; }

        [DataMember]
        [Required]
        public Status Status { get; set; }

    }
}
