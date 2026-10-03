import { Calendar, FileText, Globe, Mail } from 'lucide-react';
import type { LegalCta, LegalDocumentLabels, LegalFact, LegalHighlights, LegalSection } from '@/types/content';

export const TERMS_META = {
  title: 'Terms & Conditions',
  eyebrow: 'Legal Specifications & Master Service Agreement',
  intro:
    'Clear, transparent, and fair commercial terms governing all bespoke web design, product engineering, and creative deliverables developed by NeoXis Studio.',
  lastUpdated: 'October 24, 2026',
  effectiveDate: 'January 1, 2026',
  version: 'v2.4 (Enterprise & Studio Standard)',
  jurisdiction: 'Delaware & Global Digital Standards',
  readTime: '8 min read',
  applicability: 'Digital Product Design, Web Development & Kinetic 3D',
  legalContact: 'legal@neoxis.design',
} as const;

export const TERMS_FACTS: LegalFact[] = [
  { icon: Calendar, label: 'Effective', value: TERMS_META.effectiveDate },
  { icon: FileText, label: 'Edition', value: TERMS_META.version },
  { icon: Globe, label: 'Jurisdiction', value: TERMS_META.jurisdiction },
  { icon: Mail, label: 'Legal Desk', value: TERMS_META.legalContact, href: `mailto:${TERMS_META.legalContact}` },
];

export const TERMS_LABELS: LegalDocumentLabels = {
  sectionLabel: 'Clause',
  documentLabel: 'Terms',
  tocTitle: 'Table of Contents',
  searchPlaceholder: 'Search clauses (e.g., intellectual property, payment, warranty)...',
};

export const TERMS_HIGHLIGHTS: LegalHighlights = {
  eyebrow: 'Client Safeguards',
  title: 'Built for Transparent Partnerships',
  items: [
    '100% intellectual property ownership upon invoice settlement.',
    'Complimentary 30-day post-launch bug warranty included.',
    'Structured two-round revision cycles for each milestone.',
    'Direct repository & Figma design system transfer.',
  ],
};

export const TERMS_CTA: LegalCta = {
  eyebrow: 'Custom Contracts & Tailored SOWs',
  title: 'Need a specialized agreement or enterprise NDA?',
  text: 'We frequently accommodate bespoke enterprise procurement requirements, mutual NDAs, and staggered milestone structures.',
};

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: 'engagement-and-scope',
    number: '01',
    title: 'Engagement & Scope of Work',
    tldr: 'Every creative engagement is bound by a formal Statement of Work (SOW) or Project Proposal detailing deliverables, timelines, and milestones.',
    content: [
      'These Terms and Conditions ("Terms", "Agreement") constitute a legally binding agreement between NeoXis Studio ("NeoXis", "the Studio", "we", "us", or "our") and the client ("Client", "you", or "your") purchasing digital design, brand engineering, web development, or consulting services.',
      'All services provided by NeoXis are governed by a mutually agreed Statement of Work (SOW), project proposal, or digital contract. Each SOW specifies the project boundaries, intended functional requirements, milestone deadlines, and financial considerations. Any deliverables or features not expressly articulated in the accepted SOW are considered out of scope.',
    ],
    bullets: [
      'Written proposals and SOWs become active upon countersignature and receipt of the initial deposit.',
      'Any modifications to project specifications must be documented via our formal change order process.',
      'In the event of any direct conflict between these Terms and an executed SOW, the specific terms in the SOW shall prevail for that engagement.',
    ],
    callout: {
      type: 'info',
      title: 'Defined Deliverables',
      message: 'We operate with transparent scope boundaries. Anything outside the signed SOW will be scoped separately to protect project timelines and budget.',
    },
  },
  {
    id: 'services-and-standards',
    number: '02',
    title: 'Design & Engineering Services',
    tldr: 'We craft bespoke web experiences, headless architectures, and brand systems adhering to top-tier industry design and code standards.',
    content: [
      'NeoXis delivers high-performance digital services, including UI/UX design, visual identity systems, motion design, kinetic 3D graphics, frontend engineering, backend integrations, headless CMS implementations, and technical search engine optimization.',
      'All code is written according to modern web standards, semantic HTML, cross-browser responsiveness (tested on the latest stable versions of Chrome, Safari, Firefox, and Edge), and performance best practices. We strive for optimal Core Web Vitals and accessible markup.',
    ],
    subsections: [
      {
        title: 'Browser & Device Compatibility',
        description: 'Deliverables are engineered and verified for modern evergreen browsers on desktop, tablet, and mobile viewport widths. Legacy browsers (e.g. Internet Explorer) are strictly excluded unless specifically requested in writing.',
      },
      {
        title: 'Third-Party Integration Constraints',
        description: 'Integrations with third-party APIs (Stripe, HubSpot, Sanity, Shopify, etc.) are built to current official API specifications. NeoXis cannot be held responsible for subsequent deprecations, outages, or architectural changes enacted by third-party platform providers.',
      },
    ],
  },
  {
    id: 'client-responsibilities',
    number: '03',
    title: 'Client Collaboration & Asset Delivery',
    tldr: 'Timely feedback and prompt provision of necessary content (copy, media, credentials) are critical to maintaining the agreed schedule.',
    content: [
      'A successful digital launch is a collaborative effort. The Client agrees to designate a single, authorized Project Lead empowered to consolidate internal team feedback and grant binding approvals.',
      'The Client is responsible for supplying all required assets—including copy, logos, photography, video assets, brand guidelines, fonts, and third-party API credentials—in high-resolution formats in accordance with the project kick-off checklist.',
    ],
    bullets: [
      'The Client warrants that all materials provided to NeoXis are owned by the Client or properly licensed for use without infringing third-party intellectual property.',
      'Feedback on design presentations or staging links must be delivered within five (5) business days unless otherwise specified in the milestone schedule.',
      'Delays in asset provision or milestone reviews exceeding ten (10) consecutive business days may trigger a project pause and scheduling fee upon reactivation.',
    ],
  },
  {
    id: 'revisions-and-changes',
    number: '04',
    title: 'Revision Cycles & Change Orders',
    tldr: 'Each project stage includes two (2) consolidated rounds of revisions. Structural scope changes are quoted transparently via Change Orders.',
    content: [
      'To maintain creative momentum and meet launch targets, our development methodology includes up to two (2) structured rounds of revisions per milestone stage (Wireframing/Design Exploration, Final UI/3D Polish, and Pre-launch Staging).',
      'A revision cycle consists of a consolidated, prioritized document of feedback submitted by the Client Lead. Feedback must be actionable and remain aligned with the initial creative direction agreed upon in the discovery phase.',
    ],
    callout: {
      type: 'important',
      title: 'Scope Extension & Change Orders',
      message: 'Requests introducing new features, architectural refactoring, page additions, or reversals of previously approved milestones will be quoted as an out-of-scope Change Order at our standard hourly studio rate or fixed addendum.',
    },
  },
  {
    id: 'intellectual-property',
    number: '05',
    title: 'Intellectual Property & Ownership Rights',
    tldr: 'Upon 100% full payment, all custom design files and final bespoke codebase transfer unconditionally to you. We retain rights to our core toolkits and portfolio promotion.',
    content: [
      'Client Deliverable Ownership: Upon receipt of full and final payment for the project, NeoXis hereby assigns and transfers to the Client all worldwide rights, title, and intellectual property ownership in the bespoke visual assets, custom UI design files, custom brand illustrations, and bespoke code generated specifically for the Client.',
      'Studio Proprietary Tools & Open Source: NeoXis retains full ownership of its pre-existing libraries, proprietary workflow boilerplate, internal utility scripts, and components. The Client is granted an irrevocable, perpetual, royalty-free, non-exclusive license to use, modify, and host such code solely as embedded within the final project deliverables.',
    ],
    bullets: [
      'Third-party software, fonts, commercial stock media, and open-source libraries remain subject to their respective independent licenses.',
      'Portfolio & Promotion Rights: Unless a separate Non-Disclosure Agreement (NDA) explicitly prohibits it, NeoXis reserves the right to showcase the completed work, project visuals, and case studies in our digital portfolio, design competitions, and marketing publications.',
      'Preliminary drafts, unselected style concepts, and rejected visual directions remain the exclusive intellectual property of NeoXis.',
    ],
    callout: {
      type: 'highlight',
      title: 'Full Client Ownership',
      message: 'No licensing lock-in or recurring proprietary code fees. When the project invoice is settled, the custom code and Figma design systems are 100% yours.',
    },
  },
  {
    id: 'payment-and-invoicing',
    number: '06',
    title: 'Fees, Invoicing & Payment Terms',
    tldr: 'Projects are structured around milestone deposits (typically 50% kick-off, 25% dev sign-off, 25% pre-launch). Invoices carry Net 14 payment terms.',
    content: [
      'All prices and milestone amounts are billed in USD unless expressly agreed otherwise in writing. Standard billing schedule for fixed-price engagements is structured into milestone installments:',
      '1. 50% non-refundable Initial Deposit due prior to project kickoff and calendar scheduling.\n2. 25% Milestone Payment due upon formal sign-off of design systems and commencement of frontend/backend engineering.\n3. 25% Final Completion Payment due upon staging environment acceptance, prior to live DNS cutover and codebase repository transfer.',
    ],
    bullets: [
      'Payment terms are Net 14 days from the invoice issuance date.',
      'Late payments accrue interest at a rate of 1.5% per month (or the maximum allowable rate under applicable law) on all outstanding balances.',
      'NeoXis reserves the right to suspend active design or development work, hold staging deployments, or delay final code handoff until outstanding invoices are settled in full.',
      'The Client is responsible for any applicable wire transfer fees, transaction fees, local taxes, or VAT.',
    ],
  },
  {
    id: 'timelines-and-delays',
    number: '07',
    title: 'Project Timelines, Milestones & Launch',
    tldr: 'Timeline dates are estimated in good faith. Production handoffs and live deployment occur immediately upon final milestone sign-off.',
    content: [
      'Project schedules and launch targets provided in proposals are estimates established in good faith based on our initial assessment and anticipated client response times.',
      'While we commit to exerting commercially reasonable efforts to hit all target dates, timelines may shift due to scope adjustments, delays in receiving third-party credentials, or extended feedback intervals.',
      'Production Deployment: Launch procedures include deploying to the Client’s cloud infrastructure (Vercel, Netlify, AWS, etc.), configuring DNS records, setting up SSL certificates, and verifying live forms and tracking scripts. Deployments do not take place on Fridays or over holiday weekends to prevent downtime.',
    ],
  },
  {
    id: 'warranty-and-support',
    number: '08',
    title: 'Post-Launch Warranty & Ongoing Support',
    tldr: 'All builds include a complimentary 30-day post-launch warranty covering bug fixes and unexpected visual defects in the agreed scope.',
    content: [
      'NeoXis stands firmly behind the quality of its code. Every custom website development engagement includes a complimentary thirty (30) calendar-day Post-Launch Warranty starting on the day of production release.',
      'During the warranty window, NeoXis will remedy, without additional charge, any verifiable technical bugs, broken interactions, or cross-browser rendering flaws that do not conform to the original specifications.',
    ],
    bullets: [
      'The warranty covers code developed directly by NeoXis under the original scope.',
      'The warranty is voided if the Client or any third-party developer modifies the source code, alters server environments, or introduces conflicting plugins post-launch.',
      'Ongoing maintenance, platform updates, CMS content entry, and iterative feature development are supported through our monthly Retainer and Care Plans.',
    ],
  },
  {
    id: 'hosting-and-third-parties',
    number: '09',
    title: 'Hosting & Third-Party Dependencies',
    tldr: 'We help configure high-speed cloud infrastructure. Ongoing hosting accounts, domains, and paid subscriptions are maintained directly by you.',
    content: [
      'Web hosting accounts, domain registrations, CDN fees, and third-party SaaS subscriptions (e.g. Sanity, Supabase, Webflow, Vercel, Resend, Typeform) must be registered in the Client’s name and funded directly via the Client’s billing methods.',
      'NeoXis will assist in selecting and configuring the optimal infrastructure stack. However, NeoXis does not operate a hosting facility and cannot be held liable for third-party server downtimes, DNS propagation anomalies, cloud outages, or cyber attacks on hosting infrastructure.',
    ],
  },
  {
    id: 'confidentiality-and-nda',
    number: '10',
    title: 'Confidentiality & Non-Disclosure',
    tldr: 'Both parties agree to treat all business information, trade secrets, unreleased features, and financial data with the highest standard of confidentiality.',
    content: [
      'Each party ("Receiving Party") agrees to maintain the strict confidentiality of all non-public information, proprietary materials, technical data, customer lists, and business strategies disclosed by the other party ("Disclosing Party") throughout the engagement.',
      'Confidential information shall be used exclusively for the purpose of executing the project services and will not be disclosed to any third party without prior written consent, except to employees, contractors, and legal advisors who have a need to know and are bound by equivalent non-disclosure obligations.',
    ],
  },
  {
    id: 'liability-and-warranties',
    number: '11',
    title: 'Warranties & Limitation of Liability',
    tldr: 'Our total financial liability under any claim is strictly capped at the total fees paid by the client under the relevant Statement of Work.',
    content: [
      'Except as expressly outlined in this agreement, our services are provided on an "as-is" and "as-available" basis without warranties of any kind, whether statutory, express, or implied.',
      'In no event shall NeoXis, its founders, directors, employees, or contractors be liable for any indirect, incidental, special, punitive, exemplary, or consequential damages—including loss of profits, lost revenue, data loss, business interruption, or reputation damage—arising out of or related to this agreement or use of deliverables.',
      'To the fullest extent permitted by law, NeoXis’s total cumulative aggregate liability for all claims arising under this agreement or related to the services shall not exceed the total fees actually received by NeoXis from the Client under the specific SOW in question.',
    ],
    callout: {
      type: 'important',
      title: 'Liability Cap',
      message: 'Both parties agree that these limitations represent a reasonable allocation of commercial risk and are reflected in the competitive pricing of our creative engagements.',
    },
  },
  {
    id: 'termination-and-cancellation',
    number: '12',
    title: 'Termination & Cancellation',
    tldr: 'Either party may terminate the project with 14 days written notice. Completed milestones and billable hours incurred up to the notice date must be paid.',
    content: [
      'Convenience Termination: Either party may terminate an active engagement by providing fourteen (14) calendar days written notice via email to the primary project contact.',
      'Cause Termination: Either party may immediately terminate this agreement if the other party breaches any material term and fails to cure such breach within ten (10) days of receiving written notification.',
      'Payment upon Termination: In the event of early termination, the Client shall promptly pay NeoXis for all completed milestones, work-in-progress, and approved out-of-pocket expenses incurred up to the date of termination. Initial deposits are non-refundable.',
      'Handoff of Assets: Upon receipt of all outstanding payments, NeoXis will deliver all raw design files and source code completed up to the termination date.',
    ],
  },
  {
    id: 'governing-law-and-disputes',
    number: '13',
    title: 'Governing Law & Dispute Resolution',
    tldr: 'Governed by the laws of Delaware. Any disputes are first addressed through good-faith negotiation before proceeding to binding arbitration.',
    content: [
      'This Agreement shall be governed by, construed, and enforced in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law principles.',
      'In the event of any controversy, claim, or dispute arising out of or relating to this contract, the parties agree to first engage in good-faith executive negotiations for a minimum of thirty (30) calendar days.',
      'If the dispute remains unresolved following negotiation, it shall be submitted to confidential and binding arbitration administered by JAMS or the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules. The prevailing party shall be entitled to recover reasonable attorney fees and arbitration expenses.',
    ],
  },
];
