import Typography from "components/UI/Typography";
import { Hono } from "hono";
import getBattlenetToken from "./utils/getBattlenetToken";

const battlenetRoutes = new Hono();

battlenetRoutes.get("/auth", async (c) => {
  const token = await getBattlenetToken();
  return c.html(
    <Typography>
      <h1>Auth</h1>
      <p>{token}</p>
    </Typography>
  );
});

export default battlenetRoutes;
