import { Database } from "bun:sqlite";

export default function executeWithDatabase<T>(
  callback: (db: Database) => T
): T {
  const db = new Database("zimply.sqlite");
  try {
    return callback(db);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
