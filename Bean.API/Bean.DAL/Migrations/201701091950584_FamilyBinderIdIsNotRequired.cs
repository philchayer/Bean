namespace Bean.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FamilyBinderIdIsNotRequired : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("pla.Families", "BinderId", "pla.Binders");
            DropIndex("pla.Families", new[] { "BinderId" });
            AlterColumn("pla.Families", "BinderId", c => c.Int());
            CreateIndex("pla.Families", "BinderId");
            AddForeignKey("pla.Families", "BinderId", "pla.Binders", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("pla.Families", "BinderId", "pla.Binders");
            DropIndex("pla.Families", new[] { "BinderId" });
            AlterColumn("pla.Families", "BinderId", c => c.Int(nullable: false));
            CreateIndex("pla.Families", "BinderId");
            AddForeignKey("pla.Families", "BinderId", "pla.Binders", "Id", cascadeDelete: true);
        }
    }
}
