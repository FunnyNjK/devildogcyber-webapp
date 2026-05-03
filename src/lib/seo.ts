import {
  footerContact,
  siteMetadata,
  socialLinks,
} from '../content/siteContent';

export type PageMetadataInput = {
  title?: string;
  description: string;
  path: string;
  imagePath?: string;
  imageAlt?: string;
  keywords?: readonly string[];
};

export type BuiltPageMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords: readonly string[];
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    locale: string;
    type: string;
    imageUrl: string;
    imageAlt: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    imageUrl: string;
  };
};

export function absoluteSiteUrl(path: string): string {
  return new URL(path, siteMetadata.siteUrl).toString();
}

function toAbsoluteAssetUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  return absoluteSiteUrl(pathOrUrl);
}

export function buildPageMetadata({
  title,
  description,
  path,
  imagePath = siteMetadata.defaultOgImage,
  imageAlt = siteMetadata.title,
  keywords,
}: PageMetadataInput): BuiltPageMetadata {
  const pageTitle = title ?? siteMetadata.title;
  const canonicalUrl = absoluteSiteUrl(path);
  const imageUrl = toAbsoluteAssetUrl(imagePath);
  const keywordList = keywords ?? siteMetadata.keywords;

  return {
    title: pageTitle,
    description,
    canonicalUrl,
    keywords: keywordList,
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: siteMetadata.name,
      locale: siteMetadata.locale,
      type: 'website',
      imageUrl,
      imageAlt,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      imageUrl,
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteMetadata.siteUrl}/#organization`,
    name: siteMetadata.name,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    image: toAbsoluteAssetUrl(siteMetadata.defaultOgImage),
    logo: toAbsoluteAssetUrl(siteMetadata.logoPath),
    email: footerContact.email,
    telephone: footerContact.phone,
    sameAs: socialLinks.map((link) => link.href),
    address: {
      '@type': 'PostalAddress',
      streetAddress: footerContact.addressLines[0],
      addressLocality: 'Denver',
      addressRegion: 'CO',
      postalCode: '80202',
      addressCountry: 'US',
    },
    areaServed: 'US',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: footerContact.phone,
        email: footerContact.email,
        areaServed: 'US',
        availableLanguage: 'en',
      },
    ],
    knowsAbout: [...siteMetadata.keywords],
  };
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteMetadata.siteUrl}/#website`,
    url: siteMetadata.siteUrl,
    name: siteMetadata.name,
    description: siteMetadata.description,
    inLanguage: 'en-US',
    publisher: {
      '@id': `${siteMetadata.siteUrl}/#organization`,
    },
  };
}
