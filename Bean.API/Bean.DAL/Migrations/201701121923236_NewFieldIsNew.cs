namespace Bean.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewFieldIsNew : DbMigration
    {
        public override void Up()
        {
            MoveTable(name: "pla.Binders", newSchema: "bean");
            MoveTable(name: "pla.Families", newSchema: "bean");
            MoveTable(name: "pla.Plants", newSchema: "bean");
            MoveTable(name: "pla.PlantPlants", newSchema: "bean");
        }
        
        public override void Down()
        {
            MoveTable(name: "bean.PlantPlants", newSchema: "pla");
            MoveTable(name: "bean.Plants", newSchema: "pla");
            MoveTable(name: "bean.Families", newSchema: "pla");
            MoveTable(name: "bean.Binders", newSchema: "pla");
        }
    }
}
