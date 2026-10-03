import { Calendar, Lock, Mail, ShieldCheck } from 'lucide-react';
import type {
  LegalCta,
  LegalDocumentLabels,
  LegalFact,
  LegalHighlights,
  LegalSection,
  SubProcessor,
} from '@/types/content';

export const PRIVACY_META = {
  title: 'Privacy Policy',
  eyebrow: 'Data Protection, Client Confidentiality & GDPR/CCPA Compliance',
  intro:
    'How NeoXis Studio safeguards confidential project assets, protects user privacy, and maintains zero data broker monetization across our digital ecosystem.',
  lastUpdated: 'October 24, 2026',
  effectiveDate: 'January 1, 2026',
  version: 'v3.1 (Global Compliance)',
  dpoEmail: 'privacy@neoxis.design',
  legalContact: 'legal@neoxis.design',
  readTime: '7 min read',
  applicability: 'Agency Website, Client Portals, Staging Servers & Creative Services',
} as const;

export const PRIVACY_FACTS: LegalFact[] = [
  { icon: Calendar, label: 'Updated', value: PRIVACY_META.lastUpdated },
  { icon: ShieldCheck, label: 'Standards', value: 'GDPR & CCPA Compliant' },
  { icon: Lock, label: 'Encryption', value: 'TLS 1.3 & AES-256' },
  { icon: Mail, label: 'DPO Direct', value: PRIVACY_META.dpoEmail, href: `mailto:${PRIVACY_META.dpoEmail}` },
];

export const PRIVACY_LABELS: LegalDocumentLabels = {
  sectionLabel: 'Section',
  documentLabel: 'Policy',
  tocTitle: 'Policy Sections',
  searchPlaceholder: 'Search policy (e.g., cookies, GDPR, sub-processors)...',
};

export const PRIVACY_HIGHLIGHTS: LegalHighlights = {
  eyebrow: 'Our Privacy Standard',
  title: 'Data Protection by Architecture',
  items: [
    'Never sold, rented, or brokered to advertising third-parties.',
    'Private encrypted GitHub repos & isolated client staging.',
    'Full GDPR, CCPA/CPRA rights fulfilled within 30 days.',
    'Mandatory MFA on all internal studio software & clouds.',
  ],
};

export const PRIVACY_CTA: LegalCta = {
  eyebrow: 'Data Subject Rights & Audits',
  title: 'Have questions about our data or security standards?',
  text: 'Our Data Protection Officer is available for compliance questions, security reviews, and client audit questionnaires.',
};

/** Id of the policy section that lists sub-processors. */
export const SUB_PROCESSORS_SECTION_ID = 'subprocessors';

export const SUB_PROCESSORS: SubProcessor[] = [
  {
    name: 'Vercel Inc.',
    category: 'Cloud Hosting & Edge Network',
    purpose: 'Global edge hosting, serverless functions, and staging environment distribution.',
    location: 'United States & Worldwide (Anycast CDN)',
    link: 'https://vercel.com/legal/privacy-policy',
  },
  {
    name: 'Cloudflare, Inc.',
    category: 'Security & DNS Management',
    purpose: 'DDoS mitigation, SSL/TLS certificate termination, and web traffic routing.',
    location: 'Global (300+ Edge Data Centers)',
    link: 'https://www.cloudflare.com/privacypolicy/',
  },
  {
    name: 'Stripe, Inc.',
    category: 'Billing & Payment Processing',
    purpose: 'Secure billing tokenization, milestone invoicing, and PCI-DSS compliant credit processing.',
    location: 'United States & European Union',
    link: 'https://stripe.com/privacy',
  },
  {
    name: 'GitHub (Microsoft)',
    category: 'Source Code Repository',
    purpose: 'Private client repository hosting, continuous integration, and version control.',
    location: 'United States',
    link: 'https://docs.github.com/site-policy/privacy-policies',
  },
  {
    name: 'Figma Inc.',
    category: 'Collaborative UI/UX Design',
    purpose: 'Cloud-based collaborative design prototypes, wireframes, and design token handoff.',
    location: 'United States',
    link: 'https://www.figma.com/summary-of-privacy-policy/',
  },
  {
    name: 'Resend / AWS SES',
    category: 'Transactional Email',
    purpose: 'Delivery of project updates, staging notifications, and proposal communications.',
    location: 'United States / EU (Frankfurt)',
    link: 'https://resend.com/legal/privacy-policy',
  },
];

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: 'privacy-commitment',
    number: '01',
    title: 'Our Commitment to Privacy & Trust',
    tldr: 'We respect your digital privacy. NeoXis will never sell, rent, or trade your personal information or proprietary client project data to third-party data brokers.',
    content: [
      'NeoXis Studio ("NeoXis", "we", "our", or "us") is dedicated to upholding the highest standards of digital privacy, confidentiality, and data protection. We believe that creative transparency and technical excellence must go hand in hand with robust privacy rights.',
      'This Privacy Policy applies to personal information gathered through our website (neoxis.design), inquiry forms, client portals, staging preview links, email communications, and during creative service engagements. It describes what information we gather, how we safeguard it, and how you may exercise your legal rights under the GDPR, CCPA/CPRA, and relevant privacy laws.',
    ],
    callout: {
      type: 'highlight',
      title: 'Zero Data Broker Monetization',
      message: 'We are a creative engineering agency, not an ad network. We monetize design and code excellence—never client tracking or personal data sale.',
    },
  },
  {
    id: 'information-collected',
    number: '02',
    title: 'Information We Collect',
    tldr: 'We only collect data strictly necessary to scope projects, communicate effectively, invoice services, and deliver high-performance web products.',
    content: [
      'Depending on how you interact with our digital studio, we collect three primary categories of information:',
    ],
    subsections: [
      {
        title: '1. Information You Voluntarily Provide',
        description: 'Information submitted through contact forms, proposal requests, onboarding surveys, and email correspondence.',
        list: [
          'Identity & Contact Details: Full name, business email address, company or brand name, phone number, and job title.',
          'Project Scoping Information: Desired launch timeline, target budget range, current website URL, design preferences, and creative briefs.',
          'Billing & Payment Data: Billing address, tax identification numbers (VAT/EIN), and payment confirmation tokens (processed securely via Stripe; we never store raw credit card numbers).',
        ],
      },
      {
        title: '2. Client Project & Repository Materials',
        description: 'Assets provided during an active design and engineering project, including brand vector files, copywriting drafts, product photography, and API keys or CMS staging credentials. These are classified as strictly confidential Client Materials.',
      },
      {
        title: '3. Automated Technical & Device Data',
        description: 'When browsing our website, our servers automatically register anonymous technical telemetry to ensure optimal font rendering and interactive performance.',
        list: [
          'Device & Browser Information: Operating system, browser family and version, screen resolution, and hardware acceleration capabilities (utilized for 3D canvas optimization).',
          'Network & Geolocation: Truncated IP address (anonymized for region-level routing), referring URL, date/time timestamps, and page interaction metrics.',
        ],
      },
    ],
  },
  {
    id: 'how-we-use-information',
    number: '03',
    title: 'How We Use Your Information',
    tldr: 'Data is used solely for project execution, client communication, milestone billing, security auditing, and continuous studio performance improvement.',
    content: [
      'We process collected information based on legitimate commercial interests, contractual necessity, or explicit consent, specifically for the following purposes:',
    ],
    bullets: [
      'Project Proposals & Discovery: Reviewing design challenges, calculating project scope, and delivering tailored creative proposals.',
      'Contract Fulfillment: Designing UI/UX prototypes, building custom codebases, configuring staging servers, and launching production websites.',
      'Account Administration: Managing client milestones, issuing invoices, processing payments, and providing post-launch support.',
      'Platform Optimization: Analyzing website rendering times, diagnosing WebGL/Three.js frame drops, and improving accessibility across viewports.',
      'Legal & Compliance Obligations: Fulfilling tax obligations, preventing fraudulent activities, enforcing contracts, and complying with regulatory inquiries.',
    ],
  },
  {
    id: 'client-confidentiality',
    number: '04',
    title: 'Client Confidentiality & Code Security',
    tldr: 'Your unreleased products, design prototypes, and proprietary codebase are protected by strict non-disclosure safeguards and isolated access controls.',
    content: [
      'We recognize that our agency is trusted with pre-market brands, unannounced product releases, proprietary algorithms, and sensitive commercial strategies.',
      'All NeoXis staff and vetted creative contractors operate under binding non-disclosure agreements (NDAs). We implement role-based access restrictions across all internal communication channels and project boards.',
    ],
    bullets: [
      'Repository Isolation: Client repositories on GitHub are maintained in private, encrypted environments with mandatory multi-factor authentication (MFA).',
      'API Key Best Practices: Third-party API secrets, CMS tokens, and database credentials provided by the Client are stored in encrypted environment variable vaults (e.g., Vercel Secrets, Doppler) and are never hardcoded into client-facing client bundles.',
      'Staging Link Protection: Staging environments can be password-protected or IP-allowlisted upon request to prevent search engine indexing or unauthorized public preview prior to official launch.',
    ],
  },
  {
    id: 'cookies-and-tracking',
    number: '05',
    title: 'Cookies & Browser Storage',
    tldr: 'We use minimal, privacy-first cookies and local storage exclusively for essential layout state, smooth transitions, and aggregated performance metrics.',
    content: [
      'Cookies are small text files stored on your local device to preserve session state and performance preferences. NeoXis maintains a lightweight, privacy-conscious approach to cookies:',
    ],
    subsections: [
      {
        title: 'Essential & Functional Cookies',
        description: 'Necessary for the website to render correctly, maintain smooth page transitions (via Lenis smooth scroll and GSAP state), and remember your UI preferences. These cannot be deactivated without disrupting core browsing mechanics.',
      },
      {
        title: 'Privacy-Preserving Analytics',
        description: 'We do not utilize invasive cross-site advertising cookies or invasive third-party ad retargeting pixels. Any performance analytics utilized are aggregated, anonymized, and devoid of persistent personal profiling.',
      },
    ],
    callout: {
      type: 'info',
      title: 'Cookie Control in Your Browser',
      message: 'You can configure your browser settings at any time to reject cookies or notify you when a cookie is placed. Note that disabling local storage may affect smooth scroll and 3D canvas responsiveness.',
    },
  },
  {
    id: SUB_PROCESSORS_SECTION_ID,
    number: '06',
    title: 'Sub-processors & Third-Party Service Providers',
    tldr: 'We partner with enterprise-grade cloud providers to run our hosting, billing, and source control. All vendors meet rigorous data protection standards.',
    content: [
      'To provide world-class web experiences and reliable agency operations, we share data with selected third-party service providers ("Sub-processors"). We enforce data processing agreements (DPAs) requiring each vendor to maintain strict technical and organizational security measures.',
      'Below is our current list of primary sub-processors and the respective scope of their services:',
    ],
  },
  {
    id: 'retention-and-transfers',
    number: '07',
    title: 'Data Retention & International Transfers',
    tldr: 'Data is retained only as long as necessary to serve your project and satisfy statutory tax requirements, after which it is securely purged.',
    content: [
      'Retention Schedules: General contact form inquiries are retained for up to twelve (12) months. Active project records, design tokens, invoices, and signed contracts are retained for seven (7) years following project completion in compliance with statutory financial and legal auditing mandates.',
      'Cross-Border Data Transfers: NeoXis operates globally. As such, information may be transferred to and processed in countries outside your country of residence, including the United States.',
      'Where personal data originating in the European Economic Area (EEA), United Kingdom, or Switzerland is transferred outside these territories, we rely on EU Standard Contractual Clauses (SCCs) and appropriate supplementary measures to guarantee equivalent protection.',
    ],
  },
  {
    id: 'your-privacy-rights',
    number: '08',
    title: 'Your Global Privacy Rights (GDPR & CCPA)',
    tldr: 'You possess full rights to access, review, modify, export, or permanently erase your personal data at any time without discrimination.',
    content: [
      'Depending on your geographic jurisdiction (such as under the European General Data Protection Regulation or the California Consumer Privacy Act / CPRA), you are entitled to exercise the following fundamental rights:',
    ],
    bullets: [
      'Right of Access: You may request a complete copy of the personal information we hold concerning you.',
      'Right to Rectification: You may request the immediate correction of inaccurate or incomplete personal records.',
      'Right to Erasure ("Right to be Forgotten"): You may request the permanent deletion of your personal data, subject to legal recordkeeping obligations.',
      'Right to Restrict or Object: You may object to the processing of your data or request temporary restrictions on our data usage.',
      'Right to Data Portability: You may request to receive your provided personal data in a structured, machine-readable format (JSON/CSV).',
      'Non-Discrimination: We will never deny services, charge different prices, or alter service quality because you exercised any of your privacy rights.',
    ],
    callout: {
      type: 'important',
      title: 'How to Submit a Data Request',
      message: 'To exercise any of your privacy rights, email our Data Protection Officer at privacy@neoxis.design. We verify and respond to all verifiable requests within thirty (30) calendar days at zero cost to you.',
    },
  },
  {
    id: 'security-measures',
    number: '09',
    title: 'Technical Security & Data Safeguards',
    tldr: 'We enforce TLS 1.3 encryption in transit, AES-256 at rest, zero-trust infrastructure, and mandatory multi-factor authentication across all agency tools.',
    content: [
      'NeoXis implements multi-layered security measures to guard against accidental destruction, loss, alteration, unauthorized disclosure, or unlawful access to data.',
      'Technical safeguards include:',
    ],
    bullets: [
      'Universal HTTPS: Strict Transport Security (HSTS) with TLS 1.3 encryption across all client touchpoints and staging websites.',
      'Encrypted Storage: Database entries and code archives protected via AES-256 standard encryption at rest.',
      'Zero-Trust Access: Multi-factor authentication (MFA / FIDO2) enforced across every internal email, cloud provider, and GitHub organization account.',
      'Vulnerability Audits: Continuous automated vulnerability scans on dependencies and packages to remediate potential CVE exposures.',
    ],
  },
  {
    id: 'childrens-privacy',
    number: '10',
    title: 'Children’s Online Privacy',
    tldr: 'Our creative agency services are exclusively intended for adult professionals, businesses, and organizations. We do not knowingly collect data from children under 16.',
    content: [
      'NeoXis does not knowingly solicit or collect personal information from individuals under the age of sixteen (16). Our website and professional design services are strictly directed to businesses, entrepreneurs, and adult individuals capable of forming legally binding agreements.',
      'If you have reason to believe that a minor has provided personal details to NeoXis without verified parental consent, please contact us immediately at privacy@neoxis.design so we may promptly expunge the data from our databases.',
    ],
  },
  {
    id: 'policy-updates-contact',
    number: '11',
    title: 'Policy Updates & Contact Information',
    tldr: 'We review this policy periodically. Inquiries or feedback regarding our privacy practices should be directed to our Data Protection Officer.',
    content: [
      'We may update this Privacy Policy periodically to reflect technological shifts, operational modifications, or emerging regulatory guidelines. The "Last Updated" timestamp at the top of this document denotes the date of the most recent revision.',
      'Significant modifications impacting client data handling will be highlighted via a prominent banner on our website or direct email communication to active clients before taking effect.',
      'For questions, feedback, or concerns regarding this policy or our data practices, please reach out directly:',
      'NeoXis Studio Ltd.\nAttn: Data Protection Officer (DPO)\nEmail: privacy@neoxis.design\nGeneral Inquiries: hello@neoxis.design',
    ],
  },
];
