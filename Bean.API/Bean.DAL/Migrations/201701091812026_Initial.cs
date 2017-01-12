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
                        Name = c.String(nullable: false, maxLength: 50),
                        Description = c.String(maxLength: 500),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Families",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BinderId = c.Int(nullable: false),
                        Name = c.String(nullable: false, maxLength: 50),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Binders", t => t.BinderId, cascadeDelete: true)
                .Index(t => t.BinderId);
            
            CreateTable(
                "dbo.Plants",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FamilyId = c.Int(nullable: false),
                        Name = c.String(nullable: false, maxLength: 50),
                        LatinName = c.String(maxLength: 50),
                        PlantingIN = c.DateTime(nullable: false),
                        TransplantOUT = c.DateTime(nullable: false),
                        DirectOUT = c.DateTime(nullable: false),
                        DirectGHSummer = c.DateTime(nullable: false),
                        DirectGHWinter = c.DateTime(nullable: false),
                        DistanceBetweenPlants = c.Int(nullable: false),
                        DistanceBetweenRows = c.Int(nullable: false),
                        Yield = c.Decimal(nullable: false, precision: 18, scale: 2),
                        IsColdHardy = c.Boolean(nullable: false),
                        QuantityOnHand = c.Int(nullable: false),
                        Comment = c.String(maxLength: 500),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Families", t => t.FamilyId, cascadeDelete: true)
                .Index(t => t.FamilyId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Plants", "FamilyId", "dbo.Families");
            DropForeignKey("dbo.Families", "BinderId", "dbo.Binders");
            DropIndex("dbo.Plants", new[] { "FamilyId" });
            DropIndex("dbo.Families", new[] { "BinderId" });
            DropTable("dbo.Plants");
            DropTable("dbo.Families");
            DropTable("dbo.Binders");
        }
    }
}
