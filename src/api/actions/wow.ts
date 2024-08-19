import getBattlenetToken from "api/utils/getBattlenetToken";
import ky from "ky";

const wowApi = ky.create({
  prefixUrl: "https://eu.api.blizzard.com/data/wow/",
  searchParams: {
    namespace: "static-eu",
    locale: "en_EU",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await getBattlenetToken();
        request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
  },
});

export async function getPlayableClasses() {
  return wowApi("playable-class/index").json();
}

export async function getPlayableClass(id: number) {
  return wowApi(`playable-class/${id}`).json();
}
