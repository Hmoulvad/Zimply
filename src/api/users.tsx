import Users from "app/_views/Users";
import { Hono } from "hono";
import executeWithDatabase from "./utils/executeWithDatabase";

const userRoutes = new Hono();

userRoutes
  .get("/all", (c) => {
    const users = executeWithDatabase(
      (db) =>
        db.prepare("SELECT * FROM users;").all() as [
          { id: number; name: string; email: string }
        ]
    );
    return c.html(<Users users={users} />);
  })
  .post("/add", async (c) => {
    const { name, email } = (await c.req.parseBody()) as {
      name: string;
      email: string;
    };
    executeWithDatabase((db) => {
      db.prepare("INSERT INTO users (name, email) VALUES (?, ?);").run(
        name,
        email
      );
    });
    return c.redirect("/api/users/all");
  });

export default userRoutes;
