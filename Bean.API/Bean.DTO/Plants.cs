using System;

namespace Bean.DTO
{
    public class Plants
    {
        public int Id { get; set; }

        public string Name
        {
            get
            {
                if (!String.IsNullOrEmpty(Species))
                    return $"{PlantName} '{Species}'";
                else
                    return PlantName;
            }
        }

        public string PlantName { get; set; }

        public string LatinName { get; set; }

        public string Species { get; set; }

        public string Family { get; set; }

        public string Binder { get; set; }

        public int QuantityOnHand { get; set; }
    }
}
