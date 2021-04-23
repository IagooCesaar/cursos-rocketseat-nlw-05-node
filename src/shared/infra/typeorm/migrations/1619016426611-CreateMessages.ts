import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessages1619016426611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "messages",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "admin_id", type: "varchar", isNullable: true },
          { name: "user_id", type: "uuid" },
          { name: "text", type: "varchar" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FK_messages_user_id",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("messages");
  }
}
