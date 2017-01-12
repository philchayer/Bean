namespace Bean.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateAttributes : DbMigration
    {
        public override void Up()
        {
            AlterColumn("pla.Plants", "PlantingIN", c => c.DateTime());
            AlterColumn("pla.Plants", "TransplantOUT", c => c.DateTime());
            AlterColumn("pla.Plants", "DirectOUT", c => c.DateTime());
            AlterColumn("pla.Plants", "DirectGHSummer", c => c.DateTime());
            AlterColumn("pla.Plants", "DirectGHWinter", c => c.DateTime());
            AlterColumn("pla.Plants", "DistanceBetweenPlants", c => c.Int());
            AlterColumn("pla.Plants", "DistanceBetweenRows", c => c.Int());
            AlterColumn("pla.Plants", "Yield", c => c.Decimal(precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            AlterColumn("pla.Plants", "Yield", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("pla.Plants", "DistanceBetweenRows", c => c.Int(nullable: false));
            AlterColumn("pla.Plants", "DistanceBetweenPlants", c => c.Int(nullable: false));
            AlterColumn("pla.Plants", "DirectGHWinter", c => c.DateTime(nullable: false));
            AlterColumn("pla.Plants", "DirectGHSummer", c => c.DateTime(nullable: false));
            AlterColumn("pla.Plants", "DirectOUT", c => c.DateTime(nullable: false));
            AlterColumn("pla.Plants", "TransplantOUT", c => c.DateTime(nullable: false));
            AlterColumn("pla.Plants", "PlantingIN", c => c.DateTime(nullable: false));
        }
    }
}
