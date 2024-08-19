import fetchBattlenetToken from "api/actions/battlenet";
import type { DatabaseTypes } from "types/databaseTypes";
import executeWithDatabase from "./executeWithDatabase";

export default async function getBattlenetToken() {
  const tokenFromDatabase = executeWithDatabase((db) =>
    db
      .query<DatabaseTypes.Token, []>(
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
