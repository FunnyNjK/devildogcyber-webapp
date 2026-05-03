import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { detailPages, slugToPath } from "../src/content/detailPages.ts";

const SITE_ORIGIN = "https://devildogcyber.com";
const DIST = join(process.cwd(), "dist");

function expectedSitemapUrls(): Set<string> {
  const urls = new Set<string>();
  urls.add(`${SITE_ORIGIN}/`);
  for (const segment of ["/about", "/contact"] as const) {
    urls.add(`${SITE_ORIGIN}${segment}`);
  }
  for (const page of detailPages) {
    urls.add(`${SITE_ORIGIN}${slugToPath(page.slug)}`);
  }
  return urls;
}

function urlsFromBuiltSitemapChunks(): Set<string> {
  const urls = new Set<string>();

  const parts = readdirSync(DIST).filter((name) => /^sitemap-\d+\.xml$/.test(name));
  assert(parts.length > 0, `Expected dist/sitemap-*.xml chunks under ${DIST}`);

  const locRe = /<loc>([^<]+)<\/loc>/g;

  for (const name of parts) {
    const xml = readFileSync(join(DIST, name), "utf8");
    locRe.lastIndex = 0;
    let match: RegExpExecArray | null;

    match = locRe.exec(xml);
    assert(match !== null, `Missing <loc> in ${name}`);

    while (match !== null) {
      urls.add(match[1]);
      match = locRe.exec(xml);
    }
  }

  return urls;
}

const actual = urlsFromBuiltSitemapChunks();
const expected = expectedSitemapUrls();

assert.deepEqual(
  [...actual].sort(),
  [...expected].sort(),
  "Sitemap <loc> set must mirror static routes + detailPages (canonical apex URLs)",
);

const robotsTxt = readFileSync(join(DIST, "robots.txt"), "utf8");
assert.match(
  robotsTxt,
  /\bSitemap:\s*https:\/\/devildogcyber\.com\/sitemap-index\.xml\b/i,
  "robots.txt must reference the apex sitemap-index URL",
);

const swaConfigPath = join(DIST, "staticwebapp.config.json");
assert.ok(existsSync(swaConfigPath));

const swaCfg = JSON.parse(readFileSync(swaConfigPath, "utf8")) as {
  trailingSlash?: string;
};

assert.equal(swaCfg.trailingSlash, "never");

console.log(`verify-build-seo: OK (${actual.size} sitemap URLs)`);
