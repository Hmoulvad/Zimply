import { Hono } from "hono";
import userRoutes from "./users";

const apiRoutes = new Hono();

apiRoutes
  .get("/", (c) => {
    return c.html("Hello, World!");
  })
  .route("/users", userRoutes);

export default apiRoutes;
