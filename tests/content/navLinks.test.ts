import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { detailPages, slugToPath } from "../../src/content/detailPages";
import { navigationGroups } from "../../src/content/siteContent";

function hrefsFromNavigationGroups(): string[] {
  return navigationGroups.flatMap((group) => group.links.map((link) => link.href));
}

function staticRoutesFromPagesDir(pagesRoot: string): Set<string> {
  const routes = new Set<string>();
  for (const entry of readdirSync(pagesRoot, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".astro")) continue;
    if (entry.name.includes("[")) continue;

    const base = entry.name.replace(/\.astro$/, "");
    if (base === "index") {
      routes.add("/");
      continue;
    }

    routes.add(`/${base}`);
  }

  return routes;
}

describe("navigation link targets resolve", () => {
  const pagesRoot = join(process.cwd(), "src", "pages");
  const staticRoutes = staticRoutesFromPagesDir(pagesRoot);
  const detailPaths = new Set(detailPages.map((page) => slugToPath(page.slug)));

  it("P2-B3 detail routes (AI Threats, Security Recon, Story) are emitted by detailPages", () => {
    for (const routePath of ["/ai-threats", "/security-reconnaissance", "/story"] as const) {
      expect(detailPaths.has(routePath), `Missing detail route ${routePath}`).toBe(true);
    }
  });

  it("P2-B4 detail routes (compliance hub + framework pages) are emitted by detailPages", () => {
    for (const routePath of [
      "/compliance",
      "/compliance/cmmc",
      "/compliance/cmmi",
      "/compliance/nist-800-171",
      "/compliance/glba",
      "/compliance/hipaa",
      "/compliance/hitrust",
      "/compliance/iso-27001-27002",
    ] as const) {
      expect(detailPaths.has(routePath), `Missing detail route ${routePath}`).toBe(true);
    }
  });

  it("P2-B5 detail route (About Us / team) is emitted by detailPages", () => {
    expect(detailPaths.has("/about-us"), "Missing detail route /about-us").toBe(true);
  });

  it("every navigationGroups href resolves to a detail page slug or static src/pages route", () => {
    expect(staticRoutes.has("/")).toBe(true);

    for (const href of hrefsFromNavigationGroups()) {
      const ok = detailPaths.has(href) || staticRoutes.has(href);
      expect(ok, `Unresolved nav href ${href}`).toBe(true);
    }
  });

  it("detail page paths are stable (no collisions with static roots)", () => {
    const collisions = [...detailPaths].filter((path) => staticRoutes.has(path));
    expect(collisions).toEqual([]);
  });
});
