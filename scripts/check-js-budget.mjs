import assert from "node:assert/strict";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { basename, dirname, join, posix, relative } from "node:path";
import { gzipSync } from "node:zlib";

const DIST_NAME = "dist";
const DIST_ROOT = join(process.cwd(), DIST_NAME);
const ASTRO_JS_DIR = join(DIST_ROOT, "_astro");
const CONFIG_PATH = join(process.cwd(), "scripts", "js-budget.config.json");

const INLINE_ASTRO_JS = /\/_astro\/[A-Za-z0-9._-]+\.js/g;
const REL_IMPORT_FROM = /from\s*["'](\.[^"'<>]+\.js)["']/g;
const REL_IMPORT_DYNAMIC =
  /import\s*\(\s*["'](\.[^"'<>]+\.js)["']/g;

function walkHtml(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walkHtml(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function routeFromHtmlPath(absHtml) {
  const rel = relative(DIST_ROOT, absHtml).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) {
    const base = rel.slice(0, -"/index.html".length);
    return posix.join("/", base);
  }
  return posix.join("/", rel.replace(/\.html$/, ""));
}

function normalizeRoutePath(route) {
  if (route !== "/" && route.endsWith("/")) return route.slice(0, -1);
  return route;
}

/** @returns {{ maxSingleChunkGzipBytes: number, defaultMaxTotalGzipBytes: number, routeOverrides: Array<{path: string, maxTotalGzipBytes: number}> }} */
function readBudgetConfig() {
  const raw = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
  assert(raw && typeof raw === "object" && !Array.isArray(raw));
  const maxSingleChunkGzipBytes = raw.maxSingleChunkGzipBytes;
  const defaultMaxTotalGzipBytes = raw.defaultMaxTotalGzipBytes;
  const routeOverrides = raw.routeOverrides;
  assert(typeof maxSingleChunkGzipBytes === "number");
  assert(typeof defaultMaxTotalGzipBytes === "number");
  assert(Array.isArray(routeOverrides));

  /** @type {Array<{path: string, maxTotalGzipBytes: number}>} */
  const parsed = [];
  for (const o of routeOverrides) {
    assert(o && typeof o === "object");
    assert(typeof o.path === "string");
    assert(typeof o.maxTotalGzipBytes === "number");
    parsed.push({
      path: normalizeRoutePath(o.path),
      maxTotalGzipBytes: o.maxTotalGzipBytes,
    });
  }

  return {
    maxSingleChunkGzipBytes,
    defaultMaxTotalGzipBytes,
    routeOverrides: parsed,
  };
}

function maxTotalBudgetForRoute(cfg, route) {
  const r = normalizeRoutePath(route);
  for (const o of cfg.routeOverrides) {
    if (o.path === r) return o.maxTotalGzipBytes;
  }
  return cfg.defaultMaxTotalGzipBytes;
}

function distPathFromWebPath(rooted) {
  const u = rooted.startsWith("/") ? rooted.slice(1) : rooted;
  return u.replace(/\\/g, "/");
}

function collectChunkClosure(seedsAbsolute) {
  const seen = new Set();
  const queue = [];

  /**
   * @param {string} abs
   */
  function pushAbs(abs) {
    if (seen.has(abs)) return;
    if (!existsSync(abs)) {
      throw new Error(`Missing JS chunk (broken build graph): ${abs}`);
    }
    seen.add(abs);
    queue.push(abs);
  }

  for (const s of seedsAbsolute) pushAbs(s);

  while (queue.length > 0) {
    const cur = queue.pop();
    const text = readFileSync(cur, "utf8");
    const dir = dirname(cur);
    REL_IMPORT_FROM.lastIndex = 0;
    REL_IMPORT_DYNAMIC.lastIndex = 0;
    const rels = [];
    let m;
    while ((m = REL_IMPORT_FROM.exec(text)) !== null) rels.push(m[1]);
    while ((m = REL_IMPORT_DYNAMIC.exec(text)) !== null) rels.push(m[1]);
    for (const rel of rels) {
      if (!rel.startsWith(".")) continue;
      const target = join(dir, rel);
      pushAbs(target);
    }
  }

  return seen;
}

function gzipBytes(abs) {
  return gzipSync(readFileSync(abs)).length;
}

function main() {
  assert(existsSync(DIST_ROOT), `Expected ${DIST_NAME}/ after astro build`);
  assert(
    existsSync(ASTRO_JS_DIR),
    `Expected ${DIST_NAME}/_astro/ with client bundles`,
  );

  const cfg = readBudgetConfig();
  const chunkFiles = readdirSync(ASTRO_JS_DIR)
    .filter((n) => n.endsWith(".js"))
    .map((n) => join(ASTRO_JS_DIR, n));

  let worstChunk = "";
  let worstChunkGzip = 0;
  for (const f of chunkFiles) {
    const g = gzipBytes(f);
    if (g > worstChunkGzip) {
      worstChunkGzip = g;
      worstChunk = basename(f);
    }
  }

  assert(
    worstChunkGzip <= cfg.maxSingleChunkGzipBytes,
    `Hydrated JS single-chunk gzip ${worstChunkGzip} (${worstChunk}) exceeds maxSingleChunkGzipBytes=${cfg.maxSingleChunkGzipBytes}`,
  );

  const htmlPaths = walkHtml(DIST_ROOT);
  assert(htmlPaths.length > 0, "Expected built HTML pages under dist");

  const failures = [];
  /** @type {Record<string, { gzip: number, chunks: number }>} */
  const report = {};

  for (const htmlPath of htmlPaths) {
    const html = readFileSync(htmlPath, "utf8");
    const refs = [...html.matchAll(INLINE_ASTRO_JS)].map((mm) => mm[0]);
    const uniqueUrls = [...new Set(refs)];

    const seeds = new Set();
    for (const url of uniqueUrls) {
      seeds.add(join(DIST_ROOT, distPathFromWebPath(url)));
    }

    if (uniqueUrls.length === 0) {
      failures.push(
        `${normalizeRoutePath(routeFromHtmlPath(htmlPath))}: no /_astro/*.js in HTML (missing React islands?)`,
      );
      continue;
    }

    const closure = collectChunkClosure(seeds);
    let totalGzip = 0;
    for (const abs of closure) totalGzip += gzipBytes(abs);

    const route = normalizeRoutePath(routeFromHtmlPath(htmlPath));
    const budget = maxTotalBudgetForRoute(cfg, route);
    report[route] = {
      gzip: totalGzip,
      chunks: closure.size,
    };
    if (totalGzip > budget) {
      failures.push(
        `${route}: hydrated JS gzip ${totalGzip} > budget ${budget} (${closure.size} chunks, from ${htmlPath})`,
      );
    }
  }

  console.log(
    `JS budget (gzip, hydrated islands): worst chunk=${worstChunkGzip} bytes [${worstChunk}]`,
  );

  const routes = Object.keys(report).sort();
  for (const route of routes) {
    const row = report[route];
    const budget = maxTotalBudgetForRoute(cfg, route);
    const label = route === "/" ? "/" : route;
    console.log(
      `  ${label.padEnd(30)} gzip=${String(row.gzip).padStart(6)}  chunks=${String(row.chunks).padStart(2)}  budget=${budget}`,
    );
  }

  if (failures.length > 0) {
    throw new Error(`JS bundle budget exceeded:\n${failures.join("\n")}`);
  }

  console.log("check-js-budget: OK");
}

main();
