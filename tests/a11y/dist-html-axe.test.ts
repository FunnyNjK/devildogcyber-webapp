/**
 * Runs in Node + JSDOM (not happy-dom) so axe receives a recognizable DOM tree.
 * @vitest-environment node
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

import axe from "axe-core";
import { JSDOM } from "jsdom";
import { describe, expect, test } from "vitest";

function collectHtmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...collectHtmlFiles(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const distRoot = join(process.cwd(), "dist");
const htmlFiles = existsSync(distRoot) ? collectHtmlFiles(distRoot) : [];

describe.skipIf(htmlFiles.length === 0)("axe on built HTML (after pnpm build)", () => {
  test.each(htmlFiles)("no serious/critical violations: %s", async (filePath) => {
    const html = readFileSync(filePath, "utf8");
    const dom = new JSDOM(html, {
      url: "https://devildogcyber.com/",
      runScripts: "outside-only",
    });
    const root = dom.window.document.documentElement;
    const results = await axe.run(root, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });
    const bad = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(bad, `${relative(process.cwd(), filePath)}: ${JSON.stringify(bad, null, 2)}`).toEqual([]);
  });
});
