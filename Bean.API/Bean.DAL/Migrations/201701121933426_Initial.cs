namespace Bean.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Binders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(nullable: false, maxLength: 500),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Families",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BinderId = c.Int(),
                        Name = c.String(nullable: false, maxLength: 50),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Binders", t => t.BinderId)
                .Index(t => t.BinderId);
            
            CreateTable(
                "dbo.Plants",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FamilyId = c.Int(nullable: false),
                        Name = c.String(nullable: false, maxLength: 50),
                        LatinName = c.String(maxLength: 50),
                        PlantingIN = c.DateTime(),
                        TransplantOUT = c.DateTime(),
                        DirectOUT = c.DateTime(),
                        DirectGHSummer = c.DateTime(),
                        DirectGHWinter = c.DateTime(),
                        DistanceBetweenPlants = c.Int(),
                        DistanceBetweenRows = c.Int(),
                        Yield = c.Decimal(precision: 18, scale: 2),
                        IsColdHardy = c.Boolean(nullable: false),
                        QuantityOnHand = c.Int(nullable: false),
                        Comment = c.String(maxLength: 500),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Families", t => t.FamilyId, cascadeDelete: true)
                .Index(t => t.FamilyId);
            
            CreateTable(
                "dbo.PlantPlants",
                c => new
                    {
                        Plant_Id = c.Int(nullable: false),
                        Plant_Id1 = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Plant_Id, t.Plant_Id1 })
                .ForeignKey("dbo.Plants", t => t.Plant_Id)
                .ForeignKey("dbo.Plants", t => t.Plant_Id1)
                .Index(t => t.Plant_Id)
                .Index(t => t.Plant_Id1);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Plants", "FamilyId", "dbo.Families");
            DropForeignKey("dbo.PlantPlants", "Plant_Id1", "dbo.Plants");
            DropForeignKey("dbo.PlantPlants", "Plant_Id", "dbo.Plants");
            DropForeignKey("dbo.Families", "BinderId", "dbo.Binders");
            DropIndex("dbo.PlantPlants", new[] { "Plant_Id1" });
            DropIndex("dbo.PlantPlants", new[] { "Plant_Id" });
            DropIndex("dbo.Plants", new[] { "FamilyId" });
            DropIndex("dbo.Families", new[] { "BinderId" });
            DropTable("dbo.PlantPlants");
            DropTable("dbo.Plants");
            DropTable("dbo.Families");
            DropTable("dbo.Binders");
        }
    }
}
