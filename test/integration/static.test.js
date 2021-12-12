import { promises as fs } from "fs";
import path from "path";
import { renderViaHTTP } from "../utils";
import cheerio from "cheerio";

jest.setTimeout(1000 * 60 * 5);

function runTests(appPort) {
  it("should ssr page", async () => {
    const html = await renderViaHTTP(appPort, "/static");
    const $ = cheerio.load(html);
    expect($("h1").text()).toBe("Hello from Static world!");
  });

  it("should't contain Next.js runtime", async () => {
    const html = await renderViaHTTP(appPort, "/static");
    const $ = cheerio.load(html);
    expect($("script[src*='static/chunks/main']").length).toBe(0);
  });

  it("should contain static.js", async () => {
    const html = await renderViaHTTP(appPort, "/static");
    const $ = cheerio.load(html);
    expect($("script[src*='static/chunks/static']").length).toBe(1);
  });

  it("should contain webpack.js", async () => {
    const html = await renderViaHTTP(appPort, "/static");
    const $ = cheerio.load(html);
    expect($("script[src*='static/chunks/webpack']").length).toBe(1);
  });
}

describe("/static page", () => {
  describe("dev mode", () => {
    runTests(global.devAppPort);
  });

  describe("production mode", () => {
    runTests(global.appPort);
  });

  describe("export mode", () => {
    it("should ssr page static.html", async () => {
      expect(
        await fs
          .access(path.join(global.outDir, "static.html"))
          .then(() => true)
          .catch(() => false)
      ).toBe(true);
    });
  });
});
