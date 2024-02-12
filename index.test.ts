import { describe, expect, it } from "bun:test";
import app from "./src";

const url = "http://localhost";

function getUrl(path: string) {
  return `${url}${path}`;
}

describe("Load FrontPage", () => {
  it("Should return 200 Response", async () => {
    const req = new Request(getUrl("/"));
    const res = await app.fetch(req);
    expect(res.status).toBe(200);
  });
});

describe("Load UIPage", () => {
  it("Should return 200 Response", async () => {
    const req = new Request(getUrl("/ui"));
    const res = await app.fetch(req);
    expect(res.status).toBe(200);
  });
});
