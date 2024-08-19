import Users from "components/views/Users";
import { Hono } from "hono";
import type { User } from "types";
import executeWithDatabase from "./utils/executeWithDatabase";

const userRoutes = new Hono();

userRoutes
  .get("/all", (c) => {
    const users = executeWithDatabase((db) =>
      db.query<User, []>("SELECT * FROM users;").all()
    );
    return c.html(<Users users={users} />);
  })
  .post("/add", async (c) => {
    const { name, email } = (await c.req.parseBody()) as {
      name: string;
      email: string;
    };
    executeWithDatabase((db) => {
      db.query("INSERT INTO users (name, email) VALUES (?, ?);").run(
        name,
        email
      );
    });
    return c.redirect("/api/users/all");
  });

export default userRoutes;
