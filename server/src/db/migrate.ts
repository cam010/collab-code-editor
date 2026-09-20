import "dotenv/config";

import { Migrator } from "kysely/migration";

import { db } from "./database.js";
import * as initialSchema from "./migrations/001_initial_schema.js";

const migrator = new Migrator({
    db,
    provider: {
        async getMigrations() {
            return {
                "001_initial_schema": initialSchema,
            };
        },
    },
});

async function migrateToLatest() {
    const { error, results } = await migrator.migrateToLatest();

    results?.forEach((result) => {
        if (result.status === "Success") {
            console.log(
                `Migration "${result.migrationName}" executed successfully`
            );
        } else if (result.status === "Error") {
            console.error(
                `Failed to execute migration "${result.migrationName}"`
            );
        }
    });

    if (error) {
        console.error("Migration failed");
        console.error(error);
        process.exitCode = 1;
    } else {
        console.log("Migrations completed successfully");
    }
}

try {
    await migrateToLatest();
} finally {
    await db.destroy();
}