import Typography from "components/UI/Typography";
import { Hono } from "hono";
import { getPlayableClass } from "./actions/wow";

const battlenetRoutes = new Hono();

battlenetRoutes.get("/wow/classes", async (c) => {
  const playbleClass = await getPlayableClass(3);
  return c.html(<Typography>{JSON.stringify(playbleClass)}</Typography>);
});

export default battlenetRoutes;
