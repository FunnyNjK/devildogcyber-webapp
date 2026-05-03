import { describe, expect, it } from "vitest";

import {
  featureCards,
  serviceHighlights,
} from "../../src/content/siteContent";

describe("siteContent home sections", () => {
  it("featureCards matches legacy count and required fields", () => {
    expect(featureCards).toHaveLength(4);
    for (const card of featureCards) {
      expect(card.slug).toMatch(/^[a-z0-9-]+$/);
      expect(card.title.length).toBeGreaterThan(2);
      expect(card.description.length).toBeGreaterThan(20);
      expect(card.href.startsWith("/")).toBe(true);
      expect(card.imageSrc.startsWith("/images/devildog/home/")).toBe(true);
      expect(card.imageAlt.length).toBeGreaterThan(3);
    }
    expect(featureCards.map((c) => c.slug)).toEqual([
      "vulnerability-assessment",
      "affordable-pricing",
      "quarterly-cyber-review",
      "robust-infrastructure",
    ]);
  });

  it("serviceHighlights matches legacy slugs and icon keys", () => {
    expect(serviceHighlights).toHaveLength(9);
    const allowedIcons = new Set([
      "person",
      "cloud",
      "pulse",
      "shield",
      "sliders",
      "training",
      "check",
      "clipboard",
      "certificate",
    ]);

    for (const item of serviceHighlights) {
      expect(item.slug).toMatch(/^[a-z0-9-]+$/);
      expect(item.title.length).toBeGreaterThan(2);
      expect(item.description.length).toBeGreaterThan(10);
      expect(item.href.startsWith("/")).toBe(true);
      expect(allowedIcons.has(item.icon)).toBe(true);
    }

    expect(serviceHighlights.map((s) => s.slug)).toEqual([
      "identity-management",
      "the-watchdog-cloud",
      "security-monitoring",
      "risk-assessment",
      "security-controls",
      "training",
      "cmmc-solutions",
      "hipaa-solutions",
      "iso-solutions",
    ]);
  });
});
