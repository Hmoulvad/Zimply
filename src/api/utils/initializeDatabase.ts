import executeWithDatabase from "./executeWithDatabase";

export function initializeDatabase() {
  executeWithDatabase((db) => {
    db.query(
      `
      CREATE TABLE IF NOT EXISTS tokens (
        type TEXT PRIMARY KEY,
        token TEXT NOT NULL,
        expires INTEGER NOT NULL
      );
    `
    ).run();
  });
}
