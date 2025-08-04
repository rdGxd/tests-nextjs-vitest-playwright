import { getFullEnv } from "@/env/configs";
import { defineConfig } from "drizzle-kit";

const { databaseFile, drizzleMigrationsFolder, drizzleSchemaFiles } =
  getFullEnv();

export default defineConfig({
  out: drizzleMigrationsFolder,
  schema: "./src/core/todo/schemas/drizzle-todo-table.schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: databaseFile,
  },
});
