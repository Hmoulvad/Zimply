import Users from "app/_views/Users";
import { Hono } from "hono";

const apiRoutes = new Hono();

apiRoutes.get("/", (c) => {
  return c.html("Hello, World!");
});

apiRoutes.get("/users", (c) => {
  return c.html(<Users />);
});

export default apiRoutes;
