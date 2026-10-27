import { readFile } from "node:fs/promises";
import { pool } from "./pool.js";

try {
  await pool.query(
    await readFile(new URL("./schema.sql", import.meta.url), "utf8"),
  );
  console.log("Schema initialized");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
