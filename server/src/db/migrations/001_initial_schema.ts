import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("workspaces")
        .addColumn("id", "uuid", (col) =>
            col.primaryKey()
        )
        .addColumn("name", "varchar(255)", (col) =>
            col.notNull()
        )
        .addColumn("created_at", "timestamptz", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamptz", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute();

    await db.schema
        .createTable("files")
        .addColumn("id", "uuid", (col) =>
            col.primaryKey()
        )
        .addColumn("workspace_id", "uuid", (col) =>
            col.notNull().references("workspaces.id").onDelete("cascade")
        )
        .addColumn("name", "varchar(255)", (col) =>
            col.notNull()
        )
        .addColumn("language", "varchar(50)", (col) =>
            col.notNull().defaultTo("text")
        )
        .addColumn("content", "text", (col) =>
            col.notNull().defaultTo("")
        )
        .addColumn("created_at", "timestamptz", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamptz", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addUniqueConstraint("files_workspace_id_name_unique", ["workspace_id", "name"])
        .execute();

    await sql`
    CREATE FUNCTION set_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    `.execute(db);

    await sql`
    CREATE TRIGGER workspaces_set_updated_at
    BEFORE UPDATE ON workspaces
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
    `.execute(db);

    await sql`
    CREATE TRIGGER files_set_updated_at
    BEFORE UPDATE ON files
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
    `.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .dropTable("files")
        .execute();

    await db.schema
        .dropTable("workspaces")
        .execute();

    await sql`
        DROP FUNCTION set_updated_at();
    `.execute(db);

}