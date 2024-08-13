import Users from "app/_views/Users";
import { Hono } from "hono";
import executeWithDatabase from "./utils/executeWithDatabase";

const apiRoutes = new Hono();

apiRoutes
  .get("/", (c) => {
    return c.html("Hello, World!");
  })
  .get("/users", (c) => {
    const users = executeWithDatabase(
      (db) =>
        db.query("SELECT * FROM users;").all() as [
          { id: number; name: string; email: string }
        ]
    );

    return c.html(<Users users={users} />);
  });

export default apiRoutes;
