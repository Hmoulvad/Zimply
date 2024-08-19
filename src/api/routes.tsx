import { Hono } from "hono";
import userRoutes from "./users";
import battlenetRoutes from "./battlenet";

const apiRoutes = new Hono();

apiRoutes
  .get("/", (c) => {
    return c.html("Hello, World!");
  })
  .route("/battlenet", battlenetRoutes)
  .route("/users", userRoutes);

export default apiRoutes;
