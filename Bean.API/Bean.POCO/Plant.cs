﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Bean.POCO
{
    [DataContract(IsReference = true)]
    public class Plant
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        public int FamilyId { get; set; }

        [DataMember]
        [Required]
        [ForeignKey("FamilyId")]
        public Family Family { get; set; }

        [DataMember]
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [DataMember]
        [MaxLength(50)]
        public string LatinName { get; set; }

        [DataMember]
        public DateTime? PlantingIN { get; set; }

        [DataMember]
        public DateTime? TransplantOUT { get; set; }

        [DataMember]
        public DateTime? DirectOUT { get; set; }

        [DataMember]
        /// <summary>
        /// This date represent when you have to direct plant it into the green house at summer.
        /// </summary>
        public DateTime? DirectGHSummer { get; set; }

        [DataMember]
        /// <summary>
        /// This date represent when you have to direct plant it into the green house at winter.
        /// </summary>
        public DateTime? DirectGHWinter { get; set; }

        [DataMember]
        public int? DistanceBetweenPlants { get; set; }

        [DataMember]
        public int? DistanceBetweenRows { get; set; }

        [DataMember]
        public decimal? Yield { get; set; }

        [DataMember]
        public bool IsColdHardy { get; set; }

        [DataMember]
        public int QuantityOnHand { get; set; }

        [DataMember]
        [MaxLength(500)]
        public string Comment { get; set; }

        [DataMember]
        public List<Plant> CompanionPlants { get; set; }

        [DataMember]
        public List<Plant> HarmfulPlants { get; set; }

        [DataMember]
        [Required]
        public Status Status { get; set; }

    }
}
