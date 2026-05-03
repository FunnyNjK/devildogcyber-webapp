export type NavigationLink = {
  label: string;
  href: string;
};

export type NavigationGroup = {
  label: string;
  links: readonly NavigationLink[];
};

export type FeatureCard = {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export type ServiceHighlight = {
  slug: string;
  title: string;
  description: string;
  href: string;
  icon:
    | 'person'
    | 'cloud'
    | 'pulse'
    | 'shield'
    | 'sliders'
    | 'training'
    | 'check'
    | 'clipboard'
    | 'certificate';
};

export const siteMetadata = {
  name: 'DevilDog Cybersecurity',
  title: 'DevilDog Cybersecurity',
  description:
    'Turnkey cybersecurity, compliance, cloud, monitoring, and training solutions for organizations that need practical security programs and resilient delivery.',
  siteUrl: 'https://devildogcyber.com',
  locale: 'en_US',
  defaultOgImage: '/images/devildog/home/looking-up-trees.jpg',
  logoPath: '/images/devildog/logo-white.png',
  keywords: [
    'cybersecurity services',
    'compliance consulting',
    'security monitoring',
    'penetration testing',
    'cloud security',
    'CMMC compliance',
    'HIPAA compliance',
    'HITRUST support',
    'NIST 800-171',
    'ISO 27001',
    'executive cybersecurity',
    'maritime cybersecurity',
  ],
} as const;

export const primaryNavigation = [
  {
    label: 'AI Threats',
    href: '/ai-threats',
  },
  {
    label: 'Security Reconnaissance',
    href: '/security-reconnaissance',
  },
  {
    label: 'Story',
    href: '/story',
  },
] as const satisfies readonly NavigationLink[];

export const navigationGroups = [
  {
    label: 'Services',
    links: [
      { label: 'Services Overview', href: '/services' },
      { label: 'Executive Services', href: '/services/executive-services' },
      { label: 'Yacht Services', href: '/services/maritime/yacht-services' },
      { label: 'Port Services', href: '/services/maritime/port-services' },
      { label: 'Ship Builder Services', href: '/services/maritime/ship-builder-services' },
      { label: 'Documentation', href: '/services/documentation' },
      { label: 'Identity Management', href: '/services/identity-management' },
      { label: 'Security Monitoring', href: '/services/security-monitoring' },
      { label: 'Penetration Testing', href: '/services/penetration-testing' },
      { label: 'Risk Assessment', href: '/services/risk-assessment' },
      { label: 'Security Controls', href: '/services/security-controls' },
      { label: 'Training', href: '/services/training' },
      { label: 'WatchDog Cloud', href: '/services/watchdog-cloud' },
    ],
  },
  {
    label: 'Specialized Security',
    links: [
      { label: 'Compliance Overview', href: '/compliance' },
      { label: 'CMMC', href: '/compliance/cmmc' },
      { label: 'CMMI', href: '/compliance/cmmi' },
      { label: 'NIST 800-171', href: '/compliance/nist-800-171' },
      { label: 'GLBA', href: '/compliance/glba' },
      { label: 'HIPAA', href: '/compliance/hipaa' },
      { label: 'HITRUST', href: '/compliance/hitrust' },
      { label: 'ISO 27001 & ISO 27002', href: '/compliance/iso-27001-27002' },
    ],
  },
  {
    label: 'About Us',
    links: [
      { label: 'The DevilDog Story', href: '/story' },
      { label: 'Meet the Team', href: '/about-us' },
      { label: 'About This Site', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
] as const satisfies readonly NavigationGroup[];

export const heroContent = {
  eyebrow: 'DevilDog Cybersecurity Solutions',
  title: 'Turnkey cybersecurity solutions that are fast, affordable, and built to last.',
  paragraphs: [
    'DevilDog specializes in creating robust cybersecurity solutions that are turnkey. We offer a complete suite of customized security solutions from start to finish, with cost-effective delivery that can be expedited around your timeline.',
    'Our customized programs include vulnerability assessments, scanning, penetration testing, managed services, compliance audits, authentication, cloud security, and training. We can also build a dynamic cybersecurity program that supports your full infrastructure with 24/7 monitoring and cloud solutions aligned to strict regulatory standards.',
  ],
  imageSrc: '/images/devildog/home/looking-up-trees.jpg',
  imageAlt: 'Looking up through a canopy of trees',
} as const;

export const featureCards = [
  {
    slug: 'vulnerability-assessment',
    title: 'Vulnerability Assessment',
    description:
      'Every engagement starts with a vulnerability assessment across databases, networks, and applications so you can see your current posture and the roadmap to harden it.',
    imageSrc: '/images/devildog/home/iceberg.jpg',
    imageAlt: 'An iceberg floating in dark water',
    href: '/services/risk-assessment',
  },
  {
    slug: 'affordable-pricing',
    title: 'Affordable Pricing',
    description:
      'DevilDog uses an affordable subscription model so companies can implement cybersecurity improvements quickly and finance them over time without stalling the program.',
    imageSrc: '/images/devildog/home/affordable-pricing.jpg',
    imageAlt: 'A tranquil sky above reflective water',
    href: '/services',
  },
  {
    slug: 'quarterly-cyber-review',
    title: 'Quarterly Cyber Review',
    description:
      'Formal quarterly reviews keep your environment aligned with compliance requirements, account for emerging threats, and document meaningful changes across the business.',
    imageSrc: '/images/devildog/home/man-on-peak.jpg',
    imageAlt: 'A person standing on a mountain peak',
    href: '/compliance',
  },
  {
    slug: 'robust-infrastructure',
    title: 'Robust Infrastructure',
    description:
      'Solutions are designed to be resilient, fast to implement, and adaptable enough to support audits, technical controls, and long-term cybersecurity maturity.',
    imageSrc: '/images/devildog/home/robust-infrastructure.jpg',
    imageAlt: 'A strong bridge and infrastructure over open water',
    href: '/services/security-controls',
  },
] as const satisfies readonly FeatureCard[];

export const missionContent = {
  title: 'The DevilDog Cybersecurity Mission',
  paragraphs: [
    'Our goal at DevilDog is to develop fast, affordable, and robust cybersecurity solutions. DevilDog programs are resilient and ever-evolving so they can keep pace with a constantly changing threat landscape.',
    'We build custom programs that protect critical assets for the longevity of your business. We focus on being your cybersecurity watchdog so your team can stay focused on its core mission.',
  ],
  imageSrc: '/images/devildog/home/surfer.jpg',
  imageAlt: 'A surfer moving across an ocean wave',
} as const;

export const serviceHighlights = [
  {
    slug: 'identity-management',
    title: 'Identity Management',
    description:
      'Customized identity and access controls that help protect infrastructure from unauthorized access.',
    href: '/services/identity-management',
    icon: 'person',
  },
  {
    slug: 'the-watchdog-cloud',
    title: 'The WatchDog Cloud',
    description:
      'A cloud solution built to protect sensitive data with broad security controls across compliance frameworks.',
    href: '/services/watchdog-cloud',
    icon: 'cloud',
  },
  {
    slug: 'security-monitoring',
    title: 'Security Monitoring',
    description:
      'Proactive monitoring that helps oversee IT activity and reduce the risk of unauthorized disclosure.',
    href: '/services/security-monitoring',
    icon: 'pulse',
  },
  {
    slug: 'risk-assessment',
    title: 'Risk Assessment',
    description:
      'An 18-domain risk review with a gap analysis report that maps the path to a resilient environment.',
    href: '/services/risk-assessment',
    icon: 'shield',
  },
  {
    slug: 'security-controls',
    title: 'Security Controls',
    description:
      'Technical controls developed and deployed to move beyond policy alone and strengthen real defenses.',
    href: '/services/security-controls',
    icon: 'sliders',
  },
  {
    slug: 'training',
    title: 'Training',
    description:
      'Cybersecurity training programs designed for the C-suite, managers, engineers, and everyday staff.',
    href: '/services/training',
    icon: 'training',
  },
  {
    slug: 'cmmc-solutions',
    title: 'CMMC Solutions',
    description:
      'Implementation support from a team experienced in CMMC programs and accelerated delivery timelines.',
    href: '/compliance/cmmc',
    icon: 'check',
  },
  {
    slug: 'hipaa-solutions',
    title: 'HIPAA Solutions',
    description:
      'Healthcare-focused cybersecurity and compliance programs aligned to HIPAA and HITRUST expectations.',
    href: '/compliance/hipaa',
    icon: 'clipboard',
  },
  {
    slug: 'iso-solutions',
    title: 'ISO Solutions',
    description:
      'Security control design, documentation, and rollout support for ISO 27001 and ISO 27002 programs.',
    href: '/compliance/iso-27001-27002',
    icon: 'certificate',
  },
] as const satisfies readonly ServiceHighlight[];

export const storyContent = {
  title: 'The DevilDog Story',
  subtitle: 'Semper Fidelis',
  imageSrc: '/images/devildog/home/flyover.jpeg',
  imageAlt: 'Aerial flyover above ocean water and shoreline',
  paragraphs: [
    'DevilDog Cybersecurity was founded by US Marines with deep backgrounds in cybersecurity and business. The executive team has served in multiple branches of the armed forces and includes leaders with advanced degrees in cybersecurity and information technology.',
    'The company was built around the Marine Corps values of honor, courage, and commitment. Semper Fidelis, or Always Faithful, remains the standard for how the team shows up for clients.',
    'DevilDog’s mission is to be the first line of defense against cyber threats by building custom solutions that are robust, disciplined, and aligned to high security standards.',
    'The team prides itself on strong relationships with experts across government regulations and cybersecurity frameworks, helping clients move toward durable compliance with confidence.',
  ],
} as const;

export const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/devildogcyber/',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/devildog',
  },
] as const;

export const footerLinkGroups = [
  {
    title: 'Useful Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Compliance', href: '/compliance' },
      { label: 'The Story', href: '/story' },
      { label: 'Contact', href: '/contact' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: 'Key Solutions',
    links: [
      { label: 'Identity Management', href: '/services/identity-management' },
      { label: 'Security Monitoring', href: '/services/security-monitoring' },
      { label: 'Risk Assessment', href: '/services/risk-assessment' },
      { label: 'Security Controls', href: '/services/security-controls' },
      { label: 'Training', href: '/services/training' },
      { label: 'WatchDog Cloud', href: '/services/watchdog-cloud' },
    ],
  },
] as const;

export const footerContact = {
  title: 'Start the conversation',
  description: 'Tell DevilDog where you need help, and the team will follow up with the right next step.',
  addressLines: ['1401 Lawrence St. Suite 1600', 'Denver, CO 80202', 'United States'],
  phone: '+1 (800) 498-1295',
  email: 'info@devildogcyber.com',
} as const;
