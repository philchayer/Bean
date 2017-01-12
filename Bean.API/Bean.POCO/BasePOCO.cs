using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Bean.POCO
{
    [DataContract(IsReference = true)]
    public class BasePOCO
    {
        [NotMapped]
        public bool IsNew { get; set; } = false;
    }
}
