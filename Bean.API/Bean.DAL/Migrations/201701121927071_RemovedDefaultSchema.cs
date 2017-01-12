namespace Bean.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedDefaultSchema : DbMigration
    {
        public override void Up()
        {
            MoveTable(name: "bean.Binders", newSchema: "dbo");
            MoveTable(name: "bean.Families", newSchema: "dbo");
            MoveTable(name: "bean.Plants", newSchema: "dbo");
            MoveTable(name: "bean.PlantPlants", newSchema: "dbo");
        }
        
        public override void Down()
        {
            MoveTable(name: "dbo.PlantPlants", newSchema: "bean");
            MoveTable(name: "dbo.Plants", newSchema: "bean");
            MoveTable(name: "dbo.Families", newSchema: "bean");
            MoveTable(name: "dbo.Binders", newSchema: "bean");
        }
    }
}
