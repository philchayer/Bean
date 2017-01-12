namespace Bean.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Schema : DbMigration
    {
        public override void Up()
        {
            MoveTable(name: "dbo.Binders", newSchema: "pla");
            MoveTable(name: "dbo.Families", newSchema: "pla");
            MoveTable(name: "dbo.Plants", newSchema: "pla");
        }
        
        public override void Down()
        {
            MoveTable(name: "pla.Plants", newSchema: "dbo");
            MoveTable(name: "pla.Families", newSchema: "dbo");
            MoveTable(name: "pla.Binders", newSchema: "dbo");
        }
    }
}
