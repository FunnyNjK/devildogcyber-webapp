import { storyContent } from "./siteContent";

/** `/about` — legacy parity: marketing “About DevilDog” (nav label remains “About This Site”). */

export const aboutPageMetadata = {
  title: "About DevilDog Cybersecurity",
  description:
    "Learn about DevilDog Cybersecurity, its veteran-led approach, mission discipline, and commitment to practical cybersecurity delivery.",
  path: "/about",
  /** OG / Twitter hero image — matches legacy Next page (`storyContent.imageSrc`). */
  imagePath: storyContent.imageSrc,
  imageAlt: storyContent.imageAlt,
} as const;

export const aboutPageHero = {
  eyebrow: "About DevilDog",
  title:
    "A cybersecurity partner shaped by mission discipline, technical depth, and long-term accountability.",
  intro:
    "DevilDog is a veteran-led cybersecurity company with strong roots in compliance, infrastructure hardening, and training. The team brings mission discipline and practical delivery to organizations that need stronger security and clearer execution.",
  backHome: { label: "Back Home", href: "/" } as const,
} as const;

export const aboutPagePrinciples = [
  {
    title: "Veteran-led perspective",
    description:
      "Mission-first discipline, accountability, and follow-through shape how programs are designed and delivered.",
  },
  {
    title: "Turnkey execution",
    description:
      "DevilDog helps assess, implement, document, and support cybersecurity programs instead of stopping at recommendations.",
  },
  {
    title: "Compliance-aware delivery",
    description:
      "Solutions are built with real-world frameworks in mind, including CMMC, HIPAA, HITRUST, and ISO initiatives.",
  },
] as const;

export const aboutPageStorySection = storyContent;
