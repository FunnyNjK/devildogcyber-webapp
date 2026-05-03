export type PageTheme = 'light' | 'dark';

export type PageAction = {
  label: string;
  href: string;
};

export type PageCard = {
  title: string;
  description: string;
  href?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  bio: readonly string[];
  highlights: readonly string[];
};

export type DetailPageSection =
  | {
      kind: 'split';
      theme: PageTheme;
      eyebrow?: string;
      title: string;
      description?: string;
      paragraphs: readonly string[];
      bullets?: readonly string[];
      imageSrc?: string;
      imageAlt?: string;
      imagePosition?: 'left' | 'right';
    }
  | {
      kind: 'cards';
      theme: PageTheme;
      eyebrow?: string;
      title: string;
      description?: string;
      cards: readonly PageCard[];
      columns?: 2 | 3 | 4;
    }
  | {
      kind: 'list';
      theme: PageTheme;
      eyebrow?: string;
      title: string;
      description?: string;
      items: readonly string[];
      columns?: 2 | 3 | 4;
    }
  | {
      kind: 'team';
      theme: PageTheme;
      eyebrow?: string;
      title: string;
      description?: string;
      members: readonly TeamMember[];
    };

export type DetailPage = {
  slug: readonly string[];
  title: string;
  description: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
    align?: 'left' | 'center';
  };
  sections: readonly DetailPageSection[];
  cta?: {
    theme: PageTheme;
    title: string;
    description: string;
    primaryAction?: PageAction;
    secondaryAction?: PageAction;
  };
};

type FrameworkPageConfig = {
  slug: readonly string[];
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  whyTitle: string;
  whyParagraphs: readonly string[];
  cards: readonly PageCard[];
};

type MaritimePageConfig = {
  slug: readonly string[];
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  overview: readonly string[];
  differentiators: readonly PageCard[];
  services: readonly string[];
};

export function slugToPath(slug: readonly string[]) {
  return `/${slug.join('/')}`;
}

const contactCta = (title: string, secondaryAction?: PageAction): DetailPage['cta'] => ({
  theme: 'dark',
  title,
  description:
    'Connect with DevilDog Cybersecurity to shape a plan that matches your regulatory obligations, technical environment, and timeline.',
  primaryAction: {
    label: 'Contact DevilDog',
    href: '/contact',
  },
  secondaryAction,
});

const teamMembers = [
  {
    name: 'Isaac James',
    role: 'Managing Director',
    imageSrc: '/images/devildog/team/isaac-james.jpg',
    imageAlt: 'Isaac James portrait',
    bio: [
      'Isaac James brings a DoD-informed background in cybersecurity maturity and customer delivery.',
      'His work spans project oversight, communications management, quality assurance, business development, and customer support.',
    ],
    highlights: [
      'DoD background in Cybersecurity Maturity Model Certification (CMMC)',
      'Project oversight and customer communications leadership',
      'US Marine Corps experience',
      'Graduate degrees in cybersecurity, business, and information systems',
    ],
  },
  {
    name: 'Steve Beaty, Ph.D.',
    role: 'Chief Technology Officer',
    imageSrc: '/images/devildog/team/steve-beaty.jpg',
    imageAlt: 'Steve Beaty portrait',
    bio: [
      'Steve Beaty has led cybersecurity programs across academia, research, supercomputing, and operational environments.',
      'His background includes public cybersecurity education, large-scale infrastructure protection, and vulnerability research.',
    ],
    highlights: [
      'Cybersecurity program builder for higher education',
      'Former head of cybersecurity for NCAR',
      'Regular public cybersecurity communicator and vulnerability author',
      'Ph.D. in Information Technology',
    ],
  },
  {
    name: 'Dr. Jesus Borrego, Ph.D.',
    role: 'Chief Operating Officer',
    imageSrc: '/images/devildog/team/jesus-borrego.jpeg',
    imageAlt: 'Jesus Borrego portrait',
    bio: [
      'Dr. Borrego brings decades of information systems, satellite operations, documentation, and academic leadership experience.',
      'His career spans defense initiatives, global systems design, curriculum development, and complex program operations.',
    ],
    highlights: [
      'Strategic Defense Initiative and Department of Defense experience',
      'Real-time systems and documentation expertise',
      'Professor and curriculum design leader in cybersecurity',
      'Ph.D. in Information Systems Management',
    ],
  },
  {
    name: 'Tommy Wells',
    role: 'VP of Engineering',
    imageSrc: '/images/devildog/team/tommy-wells.jpg',
    imageAlt: 'Tommy Wells portrait',
    bio: [
      'Tommy Wells leads engineering with more than two decades of software development and architecture experience.',
      'His background blends delivery leadership, startup execution, and cloud infrastructure design.',
    ],
    highlights: [
      '20+ years of software engineering and leadership experience',
      'Multiple startup co-founder roles',
      'Deep cloud infrastructure and systems architecture knowledge',
      'Master’s degree in database engineering and computer science',
    ],
  },
] as const satisfies readonly TeamMember[];

function buildFrameworkPage(config: FrameworkPageConfig): DetailPage {
  return {
    slug: config.slug,
    title: config.title,
    description: config.description,
    hero: {
      eyebrow: 'Compliance Framework',
      title: config.title,
      subtitle: config.subtitle,
      imageSrc: config.imageSrc,
      imageAlt: config.imageAlt,
      align: 'left',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Why It Matters',
        title: config.whyTitle,
        paragraphs: config.whyParagraphs,
        imageSrc: '/images/devildog/pages/compliance.jpg',
        imageAlt: 'Compliance-themed cybersecurity background',
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'DevilDog Focus',
        title: `How DevilDog approaches ${config.title}`,
        description:
          'Framework delivery is grounded in practical controls, readable documentation, and a plan that the business can actually execute.',
        cards: config.cards,
        columns: 3,
      },
    ],
    cta: contactCta(`Start building a practical ${config.title} roadmap`, {
      label: 'View Compliance Overview',
      href: '/compliance',
    }),
  };
}

function buildMaritimePage(config: MaritimePageConfig): DetailPage {
  return {
    slug: config.slug,
    title: config.title,
    description: config.description,
    hero: {
      eyebrow: 'Maritime Services',
      title: config.title,
      subtitle: config.subtitle,
      imageSrc: config.imageSrc,
      imageAlt: config.imageAlt,
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Operational Context',
        title: 'Security for high-stakes maritime environments',
        paragraphs: config.overview,
        imageSrc: '/images/devildog/pages/watchdog-cloud.jpg',
        imageAlt: 'Clouds above the ocean',
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Why DevilDog',
        title: 'Maritime cybersecurity built for continuity',
        cards: config.differentiators,
        columns: 3,
      },
      {
        kind: 'list',
        theme: 'light',
        eyebrow: 'Service Coverage',
        title: 'What the engagement can include',
        items: config.services,
        columns: 3,
      },
    ],
    cta: contactCta(`Secure ${config.title.toLowerCase()} with a tailored maritime program`, {
      label: 'See Services',
      href: '/services',
    }),
  };
}

export const detailPages = [
  {
    slug: ['services'],
    title: 'Services',
    description:
      'Overview of DevilDog cybersecurity services across resilience, monitoring, compliance, training, executive protection, and maritime operations.',
    hero: {
      eyebrow: 'Service Portfolio',
      title: 'Cybersecurity services built around operational risk and long-term resilience.',
      subtitle:
        'DevilDog combines assessment, implementation, documentation, and continuous support so teams can move from uncertainty to a usable security program.',
      imageSrc: '/images/devildog/pages/compliance.jpg',
      imageAlt: 'Security professional reviewing digital systems',
    },
    sections: [
      {
        kind: 'cards',
        theme: 'light',
        eyebrow: 'Core Services',
        title: 'Where DevilDog shows up for clients',
        description:
          'The portfolio spans advisory, technical controls, compliance, training, and specialized environments where security failures create outsized operational risk.',
        cards: [
          {
            title: 'Identity Management',
            description: 'Design and implement access controls that keep the right people in and the wrong ones out.',
            href: '/services/identity-management',
          },
          {
            title: 'Security Monitoring',
            description: 'Use SIEM, detection, and operational monitoring to improve resilience and shorten response time.',
            href: '/services/security-monitoring',
          },
          {
            title: 'Risk Assessment',
            description: 'Map vulnerabilities, threats, and priorities into a report the business can act on.',
            href: '/services/risk-assessment',
          },
          {
            title: 'Security Controls',
            description: 'Move from policy alone into implemented controls across infrastructure, data, and operations.',
            href: '/services/security-controls',
          },
          {
            title: 'Training',
            description: 'Build security awareness and role-based training for employees, engineers, and leadership teams.',
            href: '/services/training',
          },
          {
            title: 'WatchDog Cloud',
            description: 'Deploy a managed cloud environment designed around compliance and protective control sets.',
            href: '/services/watchdog-cloud',
          },
          {
            title: 'Executive Services',
            description: 'Protect executives and families whose digital exposure creates personal and business risk.',
            href: '/services/executive-services',
          },
          {
            title: 'Maritime Services',
            description: 'Support yachts, ports, and ship builders with cyber programs that fit operational technology and communication realities.',
            href: '/services/maritime/yacht-services',
          },
          {
            title: 'Documentation & Compliance',
            description: 'Build policies, procedures, and framework-aligned documentation that supports audits and insurance requirements.',
            href: '/services/documentation',
          },
        ],
        columns: 3,
      },
      {
        kind: 'split',
        theme: 'dark',
        eyebrow: 'Delivery Model',
        title: 'Turnkey, not theoretical',
        paragraphs: [
          'DevilDog positions security as an operational discipline, not a one-time slide deck. Teams start with assessments and reporting, move into implementation, and then stay aligned through reviews, monitoring, and documentation updates.',
          'That approach is especially useful for organizations balancing compliance requirements, limited in-house security capacity, and the need to keep day-to-day operations moving while controls mature.',
        ],
        bullets: [
          'Assessment and reporting',
          'Framework-aligned control design',
          'Policy and documentation support',
          'Monitoring, review, and follow-through',
        ],
        imageSrc: '/images/devildog/home/looking-up-trees.jpg',
        imageAlt: 'Looking up into tall trees',
      },
    ],
    cta: contactCta('Choose the service path that fits your current risk and maturity', {
      label: 'Talk to DevilDog',
      href: '/contact',
    }),
  },
  {
    slug: ['ai-threats'],
    title: 'AI Threats',
    description:
      'AI threat advisory and cyber defense planning focused on emerging attack patterns, risk exposure, and resilient deployment.',
    hero: {
      eyebrow: 'Emerging Threats',
      title: 'Defusing AI threats before they compound business risk.',
      subtitle:
        'AI is accelerating attack speed, scale, and automation. DevilDog positions teams to defend, assess, and deploy responsibly.',
      imageSrc: '/images/devildog/pages/ai-threats.jpeg',
      imageAlt: 'Abstract AI-themed cybersecurity illustration',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Why It Matters',
        title: 'AI changes both the attack surface and the pace of response',
        paragraphs: [
          'DevilDog frames AI as a force multiplier for criminal activity in cybersecurity. Attackers can automate phishing, reconnaissance, exploitation, and data gathering in ways that overwhelm unprepared organizations.',
          'The response is not to avoid AI altogether. It is to understand your exposure, apply a risk management framework, and build safeguards that let leadership move with confidence.',
        ],
        imageSrc: '/images/devildog/pages/compliance.jpg',
        imageAlt: 'Red-lit cybersecurity control room',
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Approach',
        title: 'How DevilDog tackles AI-enabled risk',
        cards: [
          {
            title: 'Defend',
            description:
              'Build cyber defenses that account for AI-driven attack volume, speed, and adaptation.',
          },
          {
            title: 'Assess',
            description:
              'Measure risk exposure in AI systems, data flows, and executive accountability paths.',
          },
          {
            title: 'Deploy',
            description:
              'Use AI components in security programs while reducing leakage, misuse, and governance gaps.',
          },
        ],
        columns: 3,
      },
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Planning',
        title: 'Build a cyber defense plan leadership can stand behind',
        paragraphs: [
          'Executive liability and due diligence become more important when AI becomes part of critical business services.',
          'That makes risk management, policy, monitoring, and clear ownership just as important as the technical controls themselves.',
        ],
        imageSrc: '/images/devildog/pages/executive-service.jpeg',
        imageAlt: 'Executive cybersecurity planning session',
        imagePosition: 'left',
      },
    ],
    cta: contactCta('Shape an AI threat posture before automation works against you', {
      label: 'Explore Services',
      href: '/services',
    }),
  },
  {
    slug: ['security-reconnaissance'],
    title: 'Security Reconnaissance',
    description:
      'Reconnaissance and deception services that reveal attacker behavior, origin, techniques, and intent in real time.',
    hero: {
      eyebrow: 'CyberOps',
      title: 'Security reconnaissance that keeps you a step ahead in the cyber battlefield.',
      subtitle:
        'Use decoy systems and deceptive telemetry to learn who is attacking, how they operate, and what they want before they touch real assets.',
      imageSrc: '/images/devildog/pages/reconnaissance.jpeg',
      imageAlt: 'Cyber deception and reconnaissance visual',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Deception Layer',
        title: 'See attacker behavior clearly',
        paragraphs: [
          'DevilDog’s reconnaissance service is built around smart decoys that coax attackers into interacting with systems, credentials, and data that have no legitimate business use.',
          'Because these interactions should never happen during normal operations, they become high-confidence signals for malicious activity and give defenders a clearer picture of the threat.',
        ],
        imageSrc: '/images/devildog/pages/reconnaissance.jpeg',
        imageAlt: 'Decoy environment used for reconnaissance',
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Questions Answered',
        title: 'What the reconnaissance layer helps you understand',
        cards: [
          { title: 'Who is attacking?', description: 'Separate automated noise from persistent actors and organized campaigns.' },
          { title: 'Where are they coming from?', description: 'Trace attack origin, IP indicators, and broader targeting patterns.' },
          { title: 'What technique are they using?', description: 'Identify tactics such as brute force, malware, deception probing, or phishing.' },
          { title: 'What are they trying to reach?', description: 'See which assets, credentials, or data classes attract attacker attention.' },
          { title: 'How often is it happening?', description: 'Measure frequency and intensity so response and prioritization are grounded in evidence.' },
        ],
        columns: 3,
      },
    ],
    cta: contactCta('Add reconnaissance that makes malicious activity easier to spot', {
      label: 'View Monitoring Services',
      href: '/services/security-monitoring',
    }),
  },
  {
    slug: ['services', 'executive-services'],
    title: 'Executive Services',
    description:
      'Personal cybersecurity services for executives, families, and public-facing leaders who need discreet protection and tailored risk reduction.',
    hero: {
      eyebrow: 'Executive Protection',
      title: 'Secure leadership, family, and reputation with tailored executive cybersecurity.',
      subtitle:
        'DevilDog’s executive services focus on privacy, resilience, and high-touch protection for people with personal and professional exposure.',
      imageSrc: '/images/devildog/pages/executive-service.jpeg',
      imageAlt: 'Executive cybersecurity hero image',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Client Profile',
        title: 'Protection for high-profile lifestyles',
        paragraphs: [
          'This service is built for executives, family members, and associates whose digital exposure can create financial, reputational, or safety risk.',
          'DevilDog emphasizes discretion, efficiency, and programs that fit into day-to-day life rather than adding friction to it.',
        ],
        imageSrc: '/images/devildog/pages/penetration-testing.jpg',
        imageAlt: 'Executive risk review',
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Service Model',
        title: 'How the program is structured',
        cards: [
          {
            title: 'Awareness',
            description: 'Assess digital and physical exposure, identify where sensitive information exists, and clarify personal threat patterns.',
          },
          {
            title: 'Intervention',
            description: 'Apply security controls, coaching, and tailored changes that reduce exposure without disrupting the lifestyle being protected.',
          },
          {
            title: 'Ongoing Protective Services',
            description: 'Maintain regular monitoring, briefings, threat updates, and practical follow-through over time.',
          },
        ],
        columns: 3,
      },
    ],
    cta: contactCta('Protect executives before personal exposure becomes organizational risk', {
      label: 'Explore Services',
      href: '/services',
    }),
  },
  buildMaritimePage({
    slug: ['services', 'maritime', 'yacht-services'],
    title: 'Yacht Services',
    subtitle: 'Elite cybersecurity for yacht owners where luxury meets uncompromised security.',
    description:
      'Cybersecurity services for yacht owners focused on vessel controls, communication channels, personal devices, and continuous monitoring.',
    imageSrc: '/images/devildog/pages/yacht-services.jpg',
    imageAlt: 'Luxury yacht cybersecurity hero image',
    overview: [
      'DevilDog’s yacht offering combines military-grade cybersecurity thinking with the realities of private vessels, connected devices, satellite communication, and high-privacy ownership.',
      'The program is designed to protect onboard technology, personal devices, and communications without undermining comfort or operational continuity.',
    ],
    differentiators: [
      { title: 'Military-Grade Expertise', description: 'Apply disciplined security thinking shaped by Department of Defense experience.' },
      { title: 'Custom Solutions', description: 'Design around your vessel, your digital footprint, and your operational model.' },
      { title: 'Ongoing Support', description: 'Sustain protection with monitoring, follow-up, and support that evolves with new threats.' },
    ],
    services: [
      'Vessel control and automation security',
      'Secure communication channels and satellite connectivity',
      'Personal device protection',
      'Real-time monitoring and threat alerts',
      'Customized design and 24/7 support',
      'Alignment with maritime standards',
    ],
  }),
  buildMaritimePage({
    slug: ['services', 'maritime', 'port-services'],
    title: 'Port Services',
    subtitle: 'Port protection where efficiency meets unbreakable security.',
    description:
      'Cybersecurity services for ports focused on operational technology, communications, monitoring, and resilient digital operations.',
    imageSrc: '/images/devildog/pages/port-services.jpg',
    imageAlt: 'Port cybersecurity hero image',
    overview: [
      'Ports are increasingly dependent on operational technology, communications systems, and digital workflows that can become high-impact attack targets.',
      'DevilDog positions cybersecurity around operational continuity so disruptions, data exposure, and technology misuse are less likely to derail critical movement and logistics.',
    ],
    differentiators: [
      { title: 'Defense-Grade Expertise', description: 'Use high-discipline security practices informed by government and defense experience.' },
      { title: 'Tailored Solutions', description: 'Fit controls to the operational realities of the facility instead of forcing generic playbooks.' },
      { title: 'Continuous Support', description: 'Sustain the program with monitoring, updates, and operational guidance over time.' },
    ],
    services: [
      'Operational technology and control-system security',
      'Communication and network protection',
      'Personal device and workforce endpoint safeguards',
      'Continuous monitoring and threat notification',
      'Custom design and full-time support',
      'Maritime standards alignment',
    ],
  }),
  buildMaritimePage({
    slug: ['services', 'maritime', 'ship-builder-services'],
    title: 'Ship Builder Services',
    subtitle: 'Fortify shipbuilding operations where innovation meets unyielding security.',
    description:
      'Cybersecurity support for ship builders and shipyards focused on OT resilience, communications, workforce devices, and production continuity.',
    imageSrc: '/images/devildog/pages/ship-builder-services.jpg',
    imageAlt: 'Ship builder cybersecurity hero image',
    overview: [
      'Shipbuilders face risk across engineering systems, shipyard communications, OT environments, and confidential project data.',
      'DevilDog’s shipbuilder service is positioned to protect digital infrastructure without slowing the operational flow needed for production and delivery.',
    ],
    differentiators: [
      { title: 'Defense-Grade Expertise', description: 'Translate disciplined security methods into complex operational environments.' },
      { title: 'Custom Solutions', description: 'Design support around shipyard workflows, production dependencies, and exposure areas.' },
      { title: 'Operational Excellence', description: 'Support uninterrupted operations with monitoring, hardening, and long-term follow-through.' },
    ],
    services: [
      'Holistic cybersecurity solutions for shipyard operations',
      'Operational technology security',
      'Network and communication security',
      'Staff device protection',
      'Continuous monitoring and threat detection',
      'Custom cybersecurity design and support',
    ],
  }),
  {
    slug: ['services', 'identity-management'],
    title: 'Identity Management',
    description:
      'Identity and access management services focused on reducing unauthorized access, protecting data, and strengthening account lifecycle controls.',
    hero: {
      eyebrow: 'Security Services',
      title: 'Identity management that helps you take control of your data.',
      subtitle:
        'DevilDog specializes in access management programs that protect infrastructure, align to frameworks, and fit real implementation timelines.',
      imageSrc: '/images/devildog/pages/identity-management.jpg',
      imageAlt: 'Glass building reflecting the sky',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'IAM Delivery',
        title: 'Identity and access management with implementation depth',
        paragraphs: [
          'DevilDog’s identity management page centers on securely implementing comprehensive access solutions with subject matter expertise, engineering depth, and framework awareness.',
          'The emphasis is not just on policy. It is on operational controls that reduce unauthorized access and help companies meet security and compliance expectations in a practical time frame.',
        ],
        imageSrc: '/images/devildog/pages/watchdog-cloud.jpg',
        imageAlt: 'Clouds above a system architecture skyline',
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Benefits',
        title: 'Why IAM matters to the broader program',
        cards: [
          { title: 'Pure Identity Function', description: 'Establish trustworthy identity records and ownership across systems and users.' },
          { title: 'Service Function', description: 'Control service accounts, automation identities, and privileged pathways more intentionally.' },
          { title: 'User Access Function', description: 'Shape access around role, need, and lifecycle instead of ad hoc accumulation.' },
          { title: 'Identity Federation', description: 'Reduce friction while still enforcing clearer boundaries and authentication controls.' },
        ],
        columns: 2,
      },
      {
        kind: 'list',
        theme: 'light',
        eyebrow: 'Control Ideas',
        title: 'Examples of identity and access management controls',
        items: [
          'Automate access privilege provisioning',
          'Control privileged accounts carefully',
          'Rotate passwords frequently',
          'Enforce strong password policy',
          'Use multi-factor authentication',
          'Rotate encryption keys',
          'Remove orphan accounts',
        ],
        columns: 3,
      },
    ],
    cta: contactCta('Build an IAM program that matches your framework and operating model', {
      label: 'Explore Services',
      href: '/services',
    }),
  },
  {
    slug: ['services', 'security-monitoring'],
    title: 'Security Monitoring',
    description:
      'Security monitoring services built around SIEM, detection, insider-threat awareness, and practical response readiness.',
    hero: {
      eyebrow: 'Security Services',
      title: 'Security monitoring for resilience and recovery.',
      subtitle:
        'DevilDog’s monitoring practice combines expertise in SIEM, detection, and alerting so teams can see suspicious activity earlier and respond faster.',
      imageSrc: '/images/devildog/pages/monitoring.jpg',
      imageAlt: 'Ocean wave symbolizing monitoring and resilience',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Monitoring Practice',
        title: 'Increase resiliency and decrease risk',
        paragraphs: [
          'The monitoring offering is positioned around network security monitoring, intrusion detection, and SIEM experience across tools like Splunk, LogRhythm, Elasticsearch, and Microsoft Sentinel.',
          'DevilDog focuses on rapid implementation timelines and programs that support both security operations and compliance-oriented visibility needs.',
        ],
        imageSrc: '/images/devildog/pages/compliance.jpg',
        imageAlt: 'Cybersecurity operations monitoring screen',
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Why It Matters',
        title: 'Why monitoring belongs in the core program',
        cards: [
          { title: 'Threat Detection', description: 'Identify suspicious behavior early and trigger response paths before damage compounds.' },
          { title: 'Incident Visibility', description: 'Create a clearer picture of what is happening across infrastructure, users, and systems.' },
          { title: 'Insider Threat Awareness', description: 'Use analytics and anomaly detection to surface unusual activity from trusted accounts.' },
        ],
        columns: 3,
      },
      {
        kind: 'list',
        theme: 'light',
        eyebrow: 'Monitoring Options',
        title: 'Examples of monitoring solutions',
        items: [
          'Managed security services',
          '24/7/365 eyes-on-glass operations',
          'Threat detection',
          'Managed endpoint detection and response',
          'Cloud SIEM',
          'SSAE 16 / SOC 1 / SOC 2 reporting support',
        ],
        columns: 3,
      },
    ],
    cta: contactCta('Design a monitoring program that supports both defense and compliance', {
      label: 'See WatchDog Cloud',
      href: '/services/watchdog-cloud',
    }),
  },
  {
    slug: ['services', 'risk-assessment'],
    title: 'Risk Assessment',
    description:
      'Transparency Risk Report and cybersecurity assessment services for identifying risk, prioritizing remediation, and guiding a resilient roadmap.',
    hero: {
      eyebrow: 'Risk Assessment',
      title: 'Transparency Risk Report that turns exposure into a roadmap.',
      subtitle:
        'DevilDog uses risk assessments to identify gaps across digital assets, highlight priorities, and give teams a concrete path toward a stronger posture.',
      imageSrc: '/images/devildog/home/iceberg.jpg',
      imageAlt: 'Iceberg representing hidden risk beneath the surface',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Assessment Focus',
        title: 'Start with the real state of your environment',
        paragraphs: [
          'The Transparency Risk Report serves as the starting point for many engagements. The idea is simple: establish an honest view of risk before spending money on controls that may not address the real problem.',
          'That assessment becomes a roadmap for hardening infrastructure, supporting audits, and prioritizing remediation in a way executives and operators can both understand.',
        ],
        imageSrc: '/images/devildog/home/man-on-peak.jpg',
        imageAlt: 'Person on a peak surveying the landscape',
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Report Outcomes',
        title: 'What the report is meant to deliver',
        cards: [
          { title: 'Risk Visibility', description: 'See where vulnerabilities, threats, and weak controls are concentrated.' },
          { title: 'Prioritized Roadmap', description: 'Move from a generic wish list to a clearer remediation sequence.' },
          { title: 'Leadership Alignment', description: 'Give stakeholders a shared view of security posture and investment need.' },
        ],
        columns: 3,
      },
      {
        kind: 'list',
        theme: 'light',
        eyebrow: 'Common Scope',
        title: 'Areas often covered in the assessment conversation',
        items: [
          'Databases, networks, and applications',
          'Control gaps and policy gaps',
          'Compliance readiness',
          'Remediation priorities',
          'Quarterly review planning',
          'Infrastructure hardening opportunities',
        ],
        columns: 3,
      },
    ],
    cta: contactCta('Use the risk report as the first step in a stronger cybersecurity program', {
      label: 'Explore Compliance',
      href: '/compliance',
    }),
  },
  {
    slug: ['services', 'security-controls'],
    title: 'Security Controls',
    description:
      'Security control design and implementation services spanning infrastructure hardening, data protection, and broader program maturity.',
    hero: {
      eyebrow: 'Security Services',
      title: 'Security controls that help your environment weather the storm.',
      subtitle:
        'DevilDog focuses on practical control implementation across digital network assets, policy alignment, and ongoing program development.',
      imageSrc: '/images/devildog/pages/security-controls.jpg',
      imageAlt: 'Stormy security controls illustration',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Control Design',
        title: 'Secure your digital network assets with real implementation work',
        paragraphs: [
          'DevilDog’s controls offering is positioned around designing and implementing robust infrastructure security across frameworks, not simply writing down what should exist.',
          'The work begins with an audit of current controls, identifies gaps, and turns findings into a more complete security framework.',
        ],
        imageSrc: '/images/devildog/home/robust-infrastructure.jpg',
        imageAlt: 'Bridge and infrastructure imagery',
      },
      {
        kind: 'list',
        theme: 'light',
        eyebrow: 'Control Types',
        title: 'Examples of security controls in scope',
        items: [
          'Firewalls',
          'Fencing and physical barriers',
          'Intrusion prevention systems',
          'Data-in-transit and data-at-rest security',
          'Vulnerability scanning',
          'SIEM capabilities',
        ],
        columns: 3,
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Program Building',
        title: 'Controls live inside a broader cybersecurity program',
        cards: [
          { title: 'Have a Security Team', description: 'Treat security as a real function with ownership and operating rhythm.' },
          { title: 'Start at Onboarding', description: 'Make security behavior part of how people enter and work inside the business.' },
          { title: 'Create Measurable Goals', description: 'Track progress openly so training and controls can improve month over month.' },
        ],
        columns: 3,
      },
    ],
    cta: contactCta('Implement controls that actually change your security posture', {
      label: 'View Risk Assessment',
      href: '/services/risk-assessment',
    }),
  },
  {
    slug: ['services', 'training'],
    title: 'Training',
    description:
      'Cybersecurity training services for employees, managers, engineers, and leadership teams with content tailored to role and compliance context.',
    hero: {
      eyebrow: 'Training',
      title: 'Cybersecurity training that treats people as a core part of the defense strategy.',
      subtitle:
        'DevilDog’s training programs are designed to reduce human error, improve awareness, and build a security culture that can actually stick.',
      imageSrc: '/images/devildog/pages/training.jpg',
      imageAlt: 'Training and education visual',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Why Training',
        title: 'Personnel can be a key point of failure',
        paragraphs: [
          'Many incidents and breaches involve human error. DevilDog responds by tailoring training to role, audience, responsibility, and compliance need instead of shipping one generic awareness deck.',
          'That creates a more practical learning path for executives, engineers, managers, and everyday staff who all influence the organization’s risk profile differently.',
        ],
        imageSrc: '/images/devildog/pages/training.jpg',
        imageAlt: 'Cybersecurity training image',
      },
      {
        kind: 'list',
        theme: 'light',
        eyebrow: 'Programs',
        title: 'Examples of training formats and topics',
        items: [
          'Onsite sessions',
          'Security awareness',
          'IoT and embedded systems',
          'Malware awareness',
          'GDPR-related training',
          'Training videos',
        ],
        columns: 3,
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Outcomes',
        title: 'What better training changes',
        cards: [
          { title: 'Build Culture', description: 'Make security behavior visible, reinforced, and easier to sustain across teams.' },
          { title: 'Protect Clients', description: 'Reduce the likelihood that avoidable mistakes undermine trust and service quality.' },
          { title: 'Save Money', description: 'Lower the cost of preventable incidents, rework, and emergency response.' },
        ],
        columns: 3,
      },
    ],
    cta: contactCta('Create a training plan matched to the people you rely on most', {
      label: 'See Documentation Services',
      href: '/services/documentation',
    }),
  },
  {
    slug: ['services', 'documentation'],
    title: 'Documentation',
    description:
      'Policy and procedure documentation services aligned to frameworks like CMMC, NIST 800-171, HIPAA, GLBA, and ISO 27001/27002.',
    hero: {
      eyebrow: 'Documentation',
      title: 'Policy documentation that helps you see the forest through the trees.',
      subtitle:
        'DevilDog builds customized documentation, policies, and procedures that support compliance, cyber insurance, and practical program execution.',
      imageSrc: '/images/devildog/pages/documentation.jpg',
      imageAlt: 'Forest image for documentation page',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Documentation Support',
        title: 'Complete custom solutions for policy and procedure work',
        paragraphs: [
          'The documentation service is built for organizations that need to create or improve framework-specific policies, procedures, and supporting materials.',
          'The insurance angle matters too: without proof of adherence and supporting documentation, claims can be denied even when technical controls exist.',
        ],
        imageSrc: '/images/devildog/pages/badge.jpeg',
        imageAlt: 'Compliance badge',
      },
      {
        kind: 'list',
        theme: 'light',
        eyebrow: 'Key Policy Areas',
        title: 'Examples of documentation elements in scope',
        items: [
          'Access control policy',
          'Acceptable use policy',
          'Information security policy',
          'Incident response policy',
          'Remote access policy',
          'Change management policy',
          'Email and communication policy',
          'Disaster recovery policy',
          'Business continuity plan',
        ],
        columns: 3,
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Why It Matters',
        title: 'Documentation supports both compliance and execution',
        cards: [
          { title: 'Framework Alignment', description: 'Match policy language and structure to the standards your organization actually has to meet.' },
          { title: 'Insurance Readiness', description: 'Demonstrate adherence through readable documentation, not assumptions.' },
          { title: 'Program Clarity', description: 'Give teams a clearer operating model for security expectations and responsibilities.' },
        ],
        columns: 3,
      },
    ],
    cta: contactCta('Create documentation that stands up to audits, insurance reviews, and internal use', {
      label: 'View Compliance',
      href: '/compliance',
    }),
  },
  {
    slug: ['services', 'penetration-testing'],
    title: 'Penetration Testing',
    description:
      'Penetration testing services for proactively identifying exploitable weaknesses and producing remediation-focused findings.',
    hero: {
      eyebrow: 'Penetration Testing',
      title: 'The power of pentesting is seeing weaknesses before adversaries do.',
      subtitle:
        'DevilDog uses penetration testing to simulate attack behavior, surface vulnerabilities, and help teams harden systems before those gaps are exploited.',
      imageSrc: '/images/devildog/pages/penetration-testing.jpg',
      imageAlt: 'Hacker-themed penetration testing image',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Testing Focus',
        title: 'Detection, reporting, and remediation guidance',
        paragraphs: [
          'The pentesting service includes deep testing across systems, servers, applications, and databases, followed by a report with remediation steps.',
          'That makes the exercise more than a point-in-time attack simulation. It becomes a way to validate how well the environment would stand up to real-world pressure and what should happen next.',
        ],
        imageSrc: '/images/devildog/home/iceberg.jpg',
        imageAlt: 'Iceberg illustrating hidden attack surface',
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Why Pentest',
        title: 'Why penetration testing matters',
        cards: [
          { title: 'Reveal Real Weaknesses', description: 'Simulate adversary behavior to identify exploitable gaps, not just theoretical concerns.' },
          { title: 'Support Compliance', description: 'Meet expectations for frameworks that require periodic penetration testing.' },
          { title: 'Set the Right Cadence', description: 'Choose testing frequency based on risk, regulation, change rate, and threat pressure.' },
        ],
        columns: 3,
      },
    ],
    cta: contactCta('Use pentesting to validate defenses before attackers do it for you', {
      label: 'Explore Risk Assessment',
      href: '/services/risk-assessment',
    }),
  },
  {
    slug: ['services', 'watchdog-cloud'],
    title: 'WatchDog Cloud',
    description:
      'Managed cloud offering designed to support compliance programs with broad control coverage and practical deployment speed.',
    hero: {
      eyebrow: 'Managed Cloud',
      title: 'WatchDog Cloud brings cloud clarity through cybersecurity.',
      subtitle:
        'The WatchDog Cloud is positioned as a turnkey, cost-conscious cloud solution that supports regulated organizations with strong security controls.',
      imageSrc: '/images/devildog/pages/watchdog-cloud.jpg',
      imageAlt: 'Clouds representing managed cloud infrastructure',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Cloud Security',
        title: 'Cloud security simplified',
        paragraphs: [
          'WatchDog Cloud is presented as a managed solution that can help organizations meet requirements across government and healthcare-aligned frameworks while reducing the complexity of building everything from scratch.',
          'The offering highlights more than 100 controls, a compliance-friendly platform approach, and affordability relative to heavier alternatives.',
        ],
        imageSrc: '/images/devildog/pages/watchdog-cloud.jpg',
        imageAlt: 'Cloud security image',
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Why It Stands Out',
        title: 'What sets WatchDog Cloud apart',
        cards: [
          { title: '100+ Controls', description: 'Deploy a broad control set inside a managed cloud architecture.' },
          { title: 'Speed and Affordability', description: 'Move faster and more cost-effectively than heavier, more complex options.' },
          { title: 'Framework Support', description: 'Use the platform to support multiple compliance objectives instead of one narrow use case.' },
        ],
        columns: 3,
      },
      {
        kind: 'list',
        theme: 'light',
        eyebrow: 'Framework Fit',
        title: 'Examples of frameworks called out by the WatchDog Cloud page',
        items: ['CMMC', 'NIST 800-171', 'HIPAA', 'HITRUST', 'GLBA', 'ISO 27001'],
        columns: 3,
      },
    ],
    cta: contactCta('Evaluate whether WatchDog Cloud fits your compliance and hosting needs', {
      label: 'View Compliance',
      href: '/compliance',
    }),
  },
  {
    slug: ['compliance'],
    title: 'Compliance',
    description:
      'Compliance services overview covering frameworks, documentation, risk management, and practical implementation guidance.',
    hero: {
      eyebrow: 'Compliance',
      title: 'Robust frameworks simplified.',
      subtitle:
        'DevilDog positions compliance as a way to harden infrastructure, clarify priorities, and build a security program that can stand up to real scrutiny.',
      imageSrc: '/images/devildog/pages/compliance.jpg',
      imageAlt: 'Compliance and policy image',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Compliance Group',
        title: 'A prescriptive approach to security and regulation',
        paragraphs: [
          'DevilDog’s compliance overview frames regulation as a hardening tool rather than a paperwork exercise. The goal is to make complex requirements more understandable while still pushing toward meaningful implementation.',
          'The program includes business continuity planning, disaster recovery, risk identification, documented procedures, and continuous monitoring as pieces of that larger compliance effort.',
        ],
        imageSrc: '/images/devildog/pages/badge.jpeg',
        imageAlt: 'Compliance badge and reporting image',
      },
      {
        kind: 'list',
        theme: 'light',
        eyebrow: 'Specializations',
        title: 'Frameworks and standards supported',
        items: [
          'GLBA',
          'DFARS',
          'NIST SP 800-30',
          'NIST SP 800-34',
          'NIST SP 800-64',
          'FIPS 199 & 200',
          'CMMC',
          'FISMA',
          'NIST SP 800-39',
          'NIST SP 800-122',
          'NIST 800-53',
          'Data privacy',
          'NIST 800-171',
          'NIST SP 800-37',
          'NIST SP 800-60',
          'NIST SP 800-137',
          'NIST SP 800-18',
          'HIPAA',
          'ISO 27001',
          'NIST SP 800-12',
          'NIST SP 800-50',
          'NIST SP 800-115',
          'FedRAMP',
          'ONG-C2M2',
        ],
        columns: 4,
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Program Steps',
        title: 'How to start a compliance program',
        cards: [
          { title: 'Identify Requirements', description: 'Clarify which regulations apply and what kinds of data they govern.' },
          { title: 'Assign Leadership', description: 'Appoint or outsource security leadership so accountability and reporting stay active.' },
          { title: 'Assess and Implement', description: 'Pair risk assessments with technical controls, policies, and process improvements.' },
        ],
        columns: 3,
      },
    ],
    cta: contactCta('Map the frameworks that matter before you start spending against the wrong requirements', {
      label: 'View Documentation',
      href: '/services/documentation',
    }),
  },
  buildFrameworkPage({
    slug: ['compliance', 'cmmc'],
    title: 'CMMC',
    subtitle: 'Protect FCI and CUI while improving trust with government customers.',
    description: 'CMMC compliance services for defense contractors handling federal contract information and controlled unclassified information.',
    imageSrc: '/images/devildog/pages/military-plane.jpg',
    imageAlt: 'Military aircraft representing defense-sector compliance',
    whyTitle: 'Why CMMC matters',
    whyParagraphs: [
      'CMMC compliance is positioned around protecting Federal Contract Information and Controlled Unclassified Information while strengthening trust with government customers.',
      'DevilDog emphasizes early planning, practical implementation, and ongoing monitoring so companies can stay aligned as requirements evolve.',
    ],
    cards: [
      { title: 'Protect Sensitive Data', description: 'Build controls around FCI and CUI across storage, processing, and transmission.' },
      { title: 'Stay Contract Eligible', description: 'Use certification readiness to support competitiveness in defense contracting.' },
      { title: 'Maintain Readiness', description: 'Pair implementation with monitoring and review so maturity does not erode after the initial push.' },
    ],
  }),
  buildFrameworkPage({
    slug: ['compliance', 'cmmi'],
    title: 'CMMI',
    subtitle: 'Use process maturity to improve product and service delivery.',
    description: 'CMMI advisory for organizations improving process maturity, performance, and delivery consistency.',
    imageSrc: '/images/devildog/pages/military-tank.jpg',
    imageAlt: 'Military vehicle representing mature process operations',
    whyTitle: 'Why organizations use CMMI',
    whyParagraphs: [
      'The CMMI page frames the model as a structured way to improve process capability, performance, and consistency across the business.',
      'DevilDog presents CMMI as a roadmap through maturity levels that helps organizations move from inconsistent execution toward repeatable, optimized delivery.',
    ],
    cards: [
      { title: 'Assess Maturity', description: 'Understand current process capability and identify where discipline is breaking down.' },
      { title: 'Improve Delivery', description: 'Use maturity steps to support more reliable outcomes and better-quality services.' },
      { title: 'Optimize Over Time', description: 'Treat process improvement as a continuing discipline instead of a one-time benchmark.' },
    ],
  }),
  buildFrameworkPage({
    slug: ['compliance', 'nist-800-171'],
    title: 'NIST 800-171',
    subtitle: 'Protect controlled unclassified information and support defense-sector eligibility.',
    description: 'NIST 800-171 compliance support for organizations handling CUI and pursuing defense-related work.',
    imageSrc: '/images/devildog/pages/military-plane.jpg',
    imageAlt: 'Defense imagery for NIST 800-171 compliance',
    whyTitle: 'Why NIST 800-171 matters',
    whyParagraphs: [
      'NIST 800-171 is positioned around protecting Controlled Unclassified Information while supporting contract eligibility and stronger data security for defense-related organizations.',
      'The framework emphasizes lifecycle protection for sensitive information and the need for expert guidance that understands defense-sector realities.',
    ],
    cards: [
      { title: 'Protect CUI', description: 'Apply controls that preserve confidentiality and reduce exposure across the data lifecycle.' },
      { title: 'Support Contracts', description: 'Stay aligned to expectations tied to defense work and associated customer trust.' },
      { title: 'Use Practical Guidance', description: 'Translate framework requirements into controls, documentation, and execution steps.' },
    ],
  }),
  buildFrameworkPage({
    slug: ['compliance', 'glba'],
    title: 'GLBA',
    subtitle: 'Safeguard non-public financial information and preserve customer trust.',
    description: 'GLBA compliance services for banks, credit unions, insurers, and other organizations handling sensitive financial data.',
    imageSrc: '/images/devildog/pages/finance.jpg',
    imageAlt: 'Financial compliance and security image',
    whyTitle: 'Why GLBA matters',
    whyParagraphs: [
      'GLBA is focused on protecting customer financial information and reducing the risk of breaches or regulatory fallout inside financial organizations.',
      'DevilDog emphasizes tailored controls, careful assessment of existing practices, and ongoing support to preserve compliance over time.',
    ],
    cards: [
      { title: 'Protect Customer Data', description: 'Reduce exposure around account details, identifiers, and other non-public information.' },
      { title: 'Build Trust', description: 'Show clients and stakeholders that data protection is treated as a real business obligation.' },
      { title: 'Sustain Compliance', description: 'Pair initial control design with support that helps compliance hold up as systems change.' },
    ],
  }),
  buildFrameworkPage({
    slug: ['compliance', 'hipaa'],
    title: 'HIPAA',
    subtitle: 'Protect patient information and reduce healthcare compliance risk.',
    description: 'HIPAA compliance services for healthcare providers, health plans, clearinghouses, and business associates.',
    imageSrc: '/images/devildog/pages/healthcare.jpg',
    imageAlt: 'Healthcare security image',
    whyTitle: 'Why HIPAA matters',
    whyParagraphs: [
      'The HIPAA page centers on protecting patient data, avoiding costly penalties, and helping healthcare organizations stay aligned with regulatory expectations.',
      'DevilDog positions the work as both a data-protection exercise and a trust-building effort for organizations handling PHI and PII.',
    ],
    cards: [
      { title: 'Protect PHI', description: 'Preserve confidentiality around patient information and related healthcare data.' },
      { title: 'Avoid Penalties', description: 'Reduce the likelihood that weak controls or missing safeguards lead to costly consequences.' },
      { title: 'Support Business Associates', description: 'Extend compliance thinking to the wider partner ecosystem that handles protected information.' },
    ],
  }),
  buildFrameworkPage({
    slug: ['compliance', 'hitrust'],
    title: 'HITRUST',
    subtitle: 'Use a broader healthcare security framework to strengthen confidence and control maturity.',
    description: 'HITRUST compliance support for healthcare organizations and partners seeking a mature, structured cybersecurity program.',
    imageSrc: '/images/devildog/pages/hitrust.jpg',
    imageAlt: 'HITRUST compliance image',
    whyTitle: 'Why HITRUST matters',
    whyParagraphs: [
      'HITRUST is presented as a comprehensive healthcare-focused framework for reducing cyber risk, improving governance, and demonstrating security maturity to stakeholders.',
      'DevilDog emphasizes policy review, risk assessments, vulnerability scanning, and stronger protection for healthcare data and payment information.',
    ],
    cards: [
      { title: 'Framework Alignment', description: 'Use a mature healthcare-oriented framework to organize security expectations more clearly.' },
      { title: 'Risk Management', description: 'Combine assessments, reviews, and controls that strengthen confidence in the security program.' },
      { title: 'Reputation and Trust', description: 'Show patients, partners, and stakeholders that sensitive information is treated seriously.' },
    ],
  }),
  buildFrameworkPage({
    slug: ['compliance', 'iso-27001-27002'],
    title: 'ISO 27001 & ISO 27002',
    subtitle: 'Build an information security management approach that stakeholders can trust.',
    description: 'ISO 27001 and ISO 27002 support for organizations protecting sensitive information assets and strengthening resilience.',
    imageSrc: '/images/devildog/pages/iso.jpg',
    imageAlt: 'ISO cybersecurity image',
    whyTitle: 'Why ISO 27001 and ISO 27002 matter',
    whyParagraphs: [
      'The ISO page frames these standards as a broad information security management foundation for protecting confidentiality, integrity, and availability across critical information assets.',
      'DevilDog emphasizes risk identification, mitigation planning, and a stronger security culture that can improve stakeholder trust and overall resilience.',
    ],
    cards: [
      { title: 'Information Risk Framework', description: 'Use internationally recognized guidance to organize and manage security risk.' },
      { title: 'Stakeholder Trust', description: 'Show customers, partners, and employees that security is handled with discipline.' },
      { title: 'Operational Resilience', description: 'Improve the business’s ability to prevent, absorb, and recover from cyber disruption.' },
    ],
  }),
  {
    slug: ['story'],
    title: 'The DevilDog Story',
    description:
      'DevilDog company story covering the Semper Fidelis foundation, mission, vision, values, and impact orientation.',
    hero: {
      eyebrow: 'Our Story',
      title: 'The DevilDog story starts with Semper Fidelis.',
      subtitle:
        'The company’s identity is rooted in Marine Corps values, service-minded execution, and a belief that cybersecurity should help organizations operate with more confidence.',
      imageSrc: '/images/devildog/home/flyover.jpeg',
      imageAlt: 'Flyover image representing the DevilDog story',
    },
    sections: [
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Semper Fidelis',
        title: 'Always faithful in how the company serves clients',
        paragraphs: [
          'DevilDog Cybersecurity was founded by Marines with extensive backgrounds in cybersecurity and business. The team includes leaders with advanced degrees in information technology and cybersecurity, along with educators and experienced engineers.',
          'That identity ties directly to honor, courage, and commitment, positioning the company as a long-term partner that shows up consistently for clients.',
          'It also emphasizes relationships with leaders across government cybersecurity standards such as NIST 800-171 and CMMC, reinforcing the company’s compliance and mission focus.',
        ],
        imageSrc: '/images/devildog/home/flyover.jpeg',
        imageAlt: 'Aerial image for company story',
      },
      {
        kind: 'cards',
        theme: 'dark',
        eyebrow: 'Mission & Values',
        title: 'What DevilDog stands for',
        cards: [
          { title: 'Mission', description: 'Create innovative, resilient, and secure cybersecurity solutions.' },
          { title: 'Vision', description: 'Simplify the world through technology and practical execution.' },
          { title: 'Purpose', description: 'Build cybersecurity solutions that simplify the way clients do business and create peace of mind.' },
          { title: 'Values', description: 'Operate with courage, transparency, integrity, responsibility, and respect for clients and employees.' },
        ],
        columns: 2,
      },
      {
        kind: 'split',
        theme: 'light',
        eyebrow: 'Impact Company',
        title: 'A social mission alongside the commercial mission',
        paragraphs: [
          'The story page also calls DevilDog an impact company, with a stated commitment to using company profits in ways that create a positive difference through charitable organizations.',
          'That links the company’s internal values to an external mission and helps explain why service, accountability, and community show up so strongly in the brand.',
        ],
        imageSrc: '/images/devildog/pages/badge.jpeg',
        imageAlt: 'Badge image for impact and mission',
        imagePosition: 'left',
      },
    ],
    cta: contactCta('Learn how DevilDog’s mission translates into practical service delivery', {
      label: 'Meet the Team',
      href: '/about-us',
    }),
  },
  {
    slug: ['about-us'],
    title: 'About Us',
    description:
      'Leadership and team page for DevilDog Cybersecurity featuring executive and engineering leadership backgrounds.',
    hero: {
      eyebrow: 'Leadership',
      title: 'Meet the team behind DevilDog Cybersecurity.',
      subtitle:
        'The leadership page brings together technical depth, military experience, academic leadership, and long-term engineering practice.',
      imageSrc: '/images/devildog/home/looking-up-trees.jpg',
      imageAlt: 'Leadership and team introduction image',
    },
    sections: [
      {
        kind: 'team',
        theme: 'light',
        eyebrow: 'Leadership Team',
        title: 'Experience across engineering, operations, academia, and defense-oriented cybersecurity',
        description:
          'Meet the leadership team guiding DevilDog across engineering, operations, and cybersecurity delivery.',
        members: teamMembers,
      },
    ],
    cta: contactCta('Talk with the team behind the work', {
      label: 'View Services',
      href: '/services',
    }),
  },
] as const satisfies readonly DetailPage[];

export function getDetailPageBySlug(slug: readonly string[]) {
  return detailPages.find((page) => page.slug.join('/') === slug.join('/'));
}
