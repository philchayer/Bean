namespace Bean.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCompanionAndHarmfulPlants : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "pla.PlantPlants",
                c => new
                    {
                        Plant_Id = c.Int(nullable: false),
                        Plant_Id1 = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Plant_Id, t.Plant_Id1 })
                .ForeignKey("pla.Plants", t => t.Plant_Id)
                .ForeignKey("pla.Plants", t => t.Plant_Id1)
                .Index(t => t.Plant_Id)
                .Index(t => t.Plant_Id1);
            
        }
        
        public override void Down()
        {
            DropForeignKey("pla.PlantPlants", "Plant_Id1", "pla.Plants");
            DropForeignKey("pla.PlantPlants", "Plant_Id", "pla.Plants");
            DropIndex("pla.PlantPlants", new[] { "Plant_Id1" });
            DropIndex("pla.PlantPlants", new[] { "Plant_Id" });
            DropTable("pla.PlantPlants");
        }
    }
}
