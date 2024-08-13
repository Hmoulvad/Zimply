import executeWithDatabase from "./executeWithDatabase";

export default function populateDatabase() {
  executeWithDatabase((db) => {
    db.run(`
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT NOT NULL UNIQUE
            )
          `);

    // Insert some users
    const users = [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
      { name: "Charlie", email: "charlie@example.com" },
    ];

    const insert = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");

    for (const user of users) {
      insert.run(user.name, user.email);
    }

    console.log("Database populated with users.");
  });
}
