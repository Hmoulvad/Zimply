import fetcher from "utils/fetcher";
import executeWithDatabase from "./executeWithDatabase";

type BattlenetAuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  sub: string;
};

export default async function getBattlenetToken() {
  const tokenFromDatabase = executeWithDatabase((db) =>
    db
      .query<{ type: "battlenet"; token: string; expires: number }, []>(
        "SELECT * FROM tokens WHERE type = 'battlenet'"
      )
      .get()
  );

  if (tokenFromDatabase && !isTokenExpired(tokenFromDatabase.expires)) {
    return tokenFromDatabase.token;
  }

  const newToken = await fetchBattlenetToken();
  const newExpirationTime = calculateNewExpirationTime(newToken.expires_in);

  executeWithDatabase((db) =>
    db
      .query(
        "INSERT OR REPLACE INTO tokens (type, token, expires) VALUES (?, ?, ?);"
      )
      .run("battlenet", newToken.access_token, newExpirationTime)
  );

  return newToken.access_token;
}

function isTokenExpired(expirationTime: number): boolean {
  const currentTime = new Date().getTime();
  return currentTime >= expirationTime;
}

function calculateNewExpirationTime(expiresIn: number): number {
  return new Date().getTime() + expiresIn * 1000;
}

async function fetchBattlenetToken(): Promise<BattlenetAuthResponse> {
  return await fetcher<BattlenetAuthResponse>(
    "https://oauth.battle.net/token",
    {
      method: "POST",
      body: new URLSearchParams({
        client_id: Bun.env.BATTLENET_CLIENT_ID,
        client_secret: Bun.env.BATTLENET_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    }
  );
}
