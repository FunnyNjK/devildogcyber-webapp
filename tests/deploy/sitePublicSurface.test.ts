import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("public SEO / SWA surface", () => {
  const root = join(process.cwd(), "public");

  it("robots.txt references sitemap-index on apex HTTPS", () => {
    const text = readFileSync(join(root, "robots.txt"), "utf8");
    expect(text).toMatch(
      /^\s*Sitemap:\s*https:\/\/devildogcyber\.com\/sitemap-index\.xml\s*$/m,
    );
  });

  it("staticwebapp.config.json normalizes trailing slashes + declares gateway hosts", () => {
    const cfg = JSON.parse(readFileSync(join(root, "staticwebapp.config.json"), "utf8")) as {
      trailingSlash?: string;
      forwardingGateway?: { allowedForwardedHosts?: string[] };
    };
    expect(cfg.trailingSlash).toBe("never");

    expect(
      [...(cfg.forwardingGateway?.allowedForwardedHosts ?? []).sort()],
    ).toEqual(["devildogcyber.com", "www.devildogcyber.com"].sort());
  });
});
