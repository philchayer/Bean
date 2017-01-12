namespace Bean.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveBinderName : DbMigration
    {
        public override void Up()
        {
            AlterColumn("pla.Binders", "Description", c => c.String(nullable: false, maxLength: 500));
            DropColumn("pla.Binders", "Name");
        }
        
        public override void Down()
        {
            AddColumn("pla.Binders", "Name", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("pla.Binders", "Description", c => c.String(maxLength: 500));
        }
    }
}
