import ky from "ky";
import type { BattlenetTypes } from "types/battlenetTypes";

export default async function fetchBattlenetToken() {
  return await ky
    .post("https://oauth.battle.net/token", {
      body: new URLSearchParams({
        client_id: Bun.env.BATTLENET_CLIENT_ID,
        client_secret: Bun.env.BATTLENET_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    })
    .json<BattlenetTypes.AuthResponse>();
}
