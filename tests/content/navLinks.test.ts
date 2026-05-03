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
