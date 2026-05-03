import { describe, expect, it } from "vitest";

import {
  absoluteSiteUrl,
  buildPageMetadata,
  getOrganizationJsonLd,
  getWebsiteJsonLd,
} from "../../src/lib/seo";

describe("seo", () => {
  it("absoluteSiteUrl joins path to site origin", () => {
    expect(absoluteSiteUrl("/")).toBe("https://devildogcyber.com/");
    expect(absoluteSiteUrl("/contact")).toBe("https://devildogcyber.com/contact");
  });

  it("buildPageMetadata returns canonical + social fields", () => {
    const meta = buildPageMetadata({
      title: "Contact",
      description: "Reach our team.",
      path: "/contact",
      imagePath: "/images/devildog/home/looking-up-trees.jpg",
      imageAlt: "Trees",
      keywords: ["a", "b"],
    });

    expect(meta.title).toBe("Contact");
    expect(meta.description).toBe("Reach our team.");
    expect(meta.canonicalUrl).toBe("https://devildogcyber.com/contact");
    expect(meta.keywords).toEqual(["a", "b"]);
    expect(meta.openGraph.url).toBe("https://devildogcyber.com/contact");
    expect(meta.openGraph.imageUrl).toBe(
      "https://devildogcyber.com/images/devildog/home/looking-up-trees.jpg",
    );
    expect(meta.openGraph.imageAlt).toBe("Trees");
    expect(meta.twitter.card).toBe("summary_large_image");
    expect(meta.twitter.imageUrl).toBe(meta.openGraph.imageUrl);
  });

  it("buildPageMetadata defaults image + keywords from siteMetadata when omitted", () => {
    const meta = buildPageMetadata({
      description: "Default description",
      path: "/",
    });

    expect(meta.openGraph.imageUrl).toMatch(/^https:\/\/devildogcyber\.com\//);
    expect(meta.keywords.length).toBeGreaterThan(3);
  });

  it("getOrganizationJsonLd includes ProfessionalService shape", () => {
    const json = getOrganizationJsonLd() as Record<string, unknown>;
    expect(json["@type"]).toBe("ProfessionalService");
    expect(json.name).toBe("DevilDog Cybersecurity");
    expect(json.url).toBe("https://devildogcyber.com");
    expect(Array.isArray(json.knowsAbout)).toBe(true);
  });

  it("getWebsiteJsonLd references the organization id", () => {
    const json = getWebsiteJsonLd() as {
      publisher?: { "@id"?: string };
    };
    expect(json.publisher?.["@id"]).toBe("https://devildogcyber.com/#organization");
  });
});
