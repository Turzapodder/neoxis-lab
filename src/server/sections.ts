/**
 * Section registry: one place defining every CMS-managed content section.
 * Each entry carries the seed data (source of truth for first run) and a
 * validator used by both the API (rejecting bad writes) and the admin UI
 * (rendering the right form fields).
 */

export interface FieldRule {
  required?: boolean;
  /** Max length for strings. */
  max?: number;
  /** Recursively validate objects in this collection. */
  item?: Schema;
}

export interface Schema {
  [key: string]: FieldRule;
}

export interface SectionDef {
  /** Url slug + storage key. */
  key: string;
  label: string;
  description: string;
  /** Collection key inside section data holding the editable list. */
  listKey: 'items' | 'projects' | 'plans' | 'slides';
  schema: Schema;
  seed: unknown[];
}

/* ── Shared sub-schemas ─────────────────────────────────────────────────── */

const IMAGE_REQUIRED: FieldRule = { required: true, max: 600 };

/* ── Sections ───────────────────────────────────────────────────────────── */

export const SECTIONS: SectionDef[] = [
  {
    key: 'projects',
    label: 'Selected Work',
    description: 'Case-study tiles shown in the Selected Work deck and at /project/[id].',
    listKey: 'items',
    schema: {
      id: { required: true, max: 80 },
      num: { required: true, max: 8 },
      title: { required: true, max: 120 },
      year: { required: true, max: 10 },
      category: { required: true, max: 120 },
      image: IMAGE_REQUIRED,
      colSpanClass: { max: 120 },
      logoType: { max: 20 },
    },
    seed: [
      {
        id: 'neon-frame-system',
        num: '01.',
        title: 'Neon Frame System.',
        year: '2025',
        category: 'Spatial Web Experience',
        image: '/images/work/neon-frame.jpg',
        logoType: 'infinity',
        colSpanClass: 'lg:col-span-7 xl:col-span-8',
      },
      {
        id: 'music-os-ai',
        num: '02.',
        title: 'Music OS AI.',
        year: '2024',
        category: 'AI Audio Experience & Identity',
        image: '/images/work/music-os.jpg',
        logoType: 'speed',
        colSpanClass: 'lg:col-span-5 xl:col-span-4',
      },
      {
        id: 'botly-port-app',
        num: '03.',
        title: 'Botly® Port App.',
        year: '2024',
        category: 'Tactile Mobile OS & Flow',
        image: '/images/work/botly-app.jpg',
        logoType: 'wordmark',
      },
      {
        id: 'curea-studio',
        num: '04.',
        title: 'Curea Studio',
        year: '2023',
        category: 'Editorial Brand World',
        image: '/images/work/curea-studio.jpg',
        logoType: 'monogram',
      },
      {
        id: 'sos-core-identity-app',
        num: '05.',
        title: 'Sos Core Identity App.',
        year: '2025',
        category: 'Next-Gen iOS App & Tokens',
        image: '/images/work/sos-identity.jpg',
        logoType: 'infinity',
      },
    ],
  },
  {
    key: 'services',
    label: 'Services',
    description: 'Capabilities accordion rows and the contact-form "What are we building?" chips.',
    listKey: 'items',
    schema: {
      id: { required: true, max: 80 },
      title: { required: true, max: 120 },
      tags: { max: 300 },
      slides: { max: 40 },
    },
    seed: [
      {
        id: 'branding-design',
        title: 'Brand & Identity',
        tags: ['Brand Codes', 'Visual Systems'],
        slides: [
          {
            id: 'brand-strategy',
            label: 'Strategy',
            title: 'Brand strategy',
            description: 'Cultural positioning, tone, and visual codes locked in before pixels touch the canvas.',
            image: '/images/ui/studio-fact-work.jpg',
          },
          {
            id: 'logo-systems',
            label: 'Logo',
            title: 'Dynamic logo systems',
            description: 'Adaptive marks and kinetic vectors that pop from an app icon to huge street billboards.',
            image: '/images/ui/card-aurea.jpg',
          },
          {
            id: 'visual-identity',
            label: 'Identity',
            title: 'Visual world-building',
            description: 'Curated type systems, high-taste palettes, and art direction that make your brand unmistakable.',
            image: '/images/work/curea-studio.jpg',
          },
          {
            id: 'brand-guidelines',
            label: 'Guidelines',
            title: 'Living brand kits',
            description: 'Zero gatekeeping: interactive design tokens and guidelines your crew can actually ship with.',
            image: '/images/work/sos-identity.jpg',
          },
        ],
      },
      {
        id: 'digital-design',
        title: 'Motion & 3D Craft',
        tags: ['Fluid Physics', 'Creative Tech'],
        slides: [
          {
            id: 'motion-design',
            label: 'Motion',
            title: 'Kinetic motion',
            description: 'Micro-interactions and fluid physics that make every tap and scroll feel buttery smooth.',
            image: '/images/work/music-os.jpg',
          },
          {
            id: 'campaign-assets',
            label: 'Campaigns',
            title: 'Launch drops',
            description: 'High-converting launch assets, teaser visuals, and campaign collateral primed for virality.',
            image: '/images/work/neon-frame.jpg',
          },
          {
            id: 'accessibility',
            label: 'Accessibility',
            title: 'Inclusive by default',
            description: 'Contrast, focus states, and reduced-motion modes engineered right into every component.',
            image: '/images/ui/card-spatial.jpg',
          },
          {
            id: 'illustration',
            label: '3D Art',
            title: '3D & Spatial visuals',
            description: 'Custom 3D objects, tactile textures, and bespoke visual art that banish stock photos forever.',
            image: '/images/ui/card-aurea.jpg',
          },
        ],
      },
      {
        id: 'web-design',
        title: 'Web Experiences',
        tags: ['Next.js & Framer', 'High-Converting'],
        slides: [
          {
            id: 'landing-pages',
            label: 'Landing',
            title: 'High-energy landings',
            description: 'Lightning-fast, visually stunning pages engineered to turn curious scrollers into obsessed users.',
            image: '/images/ui/card-spatial.jpg',
          },
          {
            id: 'portfolio-sites',
            label: 'Portfolio',
            title: 'Editorial showcases',
            description: 'Cinematic case-study layouts and interactive narratives that command instant authority.',
            image: '/images/work/neon-frame.jpg',
          },
          {
            id: 'ecommerce',
            label: 'Commerce',
            title: 'Frictionless commerce',
            description: 'Product drops and checkout loops stripped of friction to maximize impulse and retention.',
            image: '/images/work/botly-app.jpg',
          },
          {
            id: 'cms-builds',
            label: 'CMS',
            title: 'Headless CMS stacks',
            description: 'Modern content engines your marketing team can publish to in seconds with zero dev pings.',
            image: '/images/ui/meet-minds-team.jpg',
          },
        ],
      },
      {
        id: 'ui-ux-design',
        title: 'Product & UI/UX',
        tags: ['UX Architecture', 'Design Systems'],
        slides: [
          {
            id: 'user-research',
            label: 'Research',
            title: 'User telemetry',
            description: 'Qualitative user feedback and telemetry mapping that pinpoint exactly where friction hides.',
            image: '/images/ui/meet-minds-team.jpg',
          },
          {
            id: 'wireframing',
            label: 'Flows',
            title: 'Rapid wireframing',
            description: 'Low-fidelity flows and prototypes mapped fast so big decisions stay cheap and agile.',
            image: '/images/ui/studio-fact-work.jpg',
          },
          {
            id: 'mobile-apps',
            label: 'Mobile',
            title: 'Tactile mobile apps',
            description: 'Thumb-friendly iOS and Android interfaces crafted for daily engagement and clean workflows.',
            image: '/images/ui/card-mobile.jpg',
          },
          {
            id: 'design-systems',
            label: 'Systems',
            title: 'Tokenized systems',
            description: 'Production-ready component libraries in Figma and code that keep design and dev locked in sync.',
            image: '/images/work/botly-app.jpg',
          },
        ],
      },
      {
        id: 'cross-platform-mobile',
        title: 'Cross-Platform Mobile Apps',
        tags: ['React Native', 'Flutter', 'iOS + Android'],
        slides: [
          {
            id: 'react-native',
            label: 'RN',
            title: 'React Native builds',
            description: 'One TypeScript codebase, two native apps. We ship Expo/RN apps with native modules where it counts.',
            image: '/images/work/botly-app.jpg',
          },
          {
            id: 'flutter',
            label: 'Flutter',
            title: 'Flutter experiences',
            description: 'Pixel-perfect, 120fps interfaces from a single Dart codebase, with custom motion and platform channels.',
            image: '/images/ui/card-mobile.jpg',
          },
          {
            id: 'native-performance',
            label: 'Native',
            title: 'Native-grade performance',
            description: 'Offline-first data layers, 60fps gesture-driven UI, and push, deep links, and biometrics wired in from day one.',
            image: '/images/work/sos-identity.jpg',
          },
          {
            id: 'app-launch',
            label: 'Launch',
            title: 'Ship & keep shipping',
            description: 'App Store and Play Store submissions, OTA updates via CodePush/EAS, and analytics from the first session.',
            image: '/images/work/music-os.jpg',
          },
        ],
      },
    ],
  },
  {
    key: 'pricing',
    label: 'Pricing',
    description: 'Pricing plans and deliverables shown in the pricing section.',
    listKey: 'items',
    schema: {
      id: { required: true, max: 80 },
      name: { required: true, max: 80 },
      duration: { max: 40 },
      priceStandard: { max: 40 },
      pricePremium: { max: 40 },
      unit: { max: 40 },
      tagline: { required: true, max: 240 },
      features: { max: 1200 },
      featured: { max: 5 },
    },
    seed: [
      {
        id: 'low-budget',
        name: 'Sprint MVP',
        duration: '4-7 Days',
        priceStandard: '$500',
        pricePremium: '$900',
        unit: '/Project',
        tagline: 'Tight deadline or wireframes ready to go? Fast-track your launch.',
        features: [
          'Wireframe or clear brief ready to build',
          'High-fidelity UI in Figma or Framer',
          'Async collaboration via Slack & Loom',
          'Rapid 4–7 business day turnaround',
          'Production-ready Figma asset export',
        ],
      },
      {
        id: 'standard-plan',
        name: 'Growth Scale',
        duration: '15 Days',
        priceStandard: '$5,000',
        pricePremium: '$8,500',
        unit: '/Project',
        tagline: 'Full-scale design overhaul for startups ready to dominate their category.',
        features: [
          'End-to-end UX flow & wireframing',
          'Bespoke Figma UI system & motion polish',
          'Direct Slack channel & tight review loops',
          'Unlimited iterations within active sprint',
          'Tokenized design system & dev handoff',
        ],
        featured: 'true',
      },
      {
        id: 'advanced-project',
        name: 'Full Ecosystem',
        duration: '3-6 Month',
        priceStandard: 'Custom',
        pricePremium: 'Custom',
        tagline: 'Dedicated elite design firepower embedded directly with your core product crew.',
        features: [
          'Strategic roadmapping & custom scoping',
          'Multi-platform apps & design systems',
          'Embedded alongside your engineering squad',
          'Milestone-based agile sprint deployments',
          'Continuous 3D, motion, and web integration',
        ],
      },
    ],
  },
  {
    key: 'team',
    label: 'Team',
    description: 'People in the team spotlight and avatar stacks across sections.',
    listKey: 'items',
    schema: {
      id: { required: true, max: 80 },
      name: { required: true, max: 80 },
      role: { required: true, max: 80 },
      location: { max: 80 },
      bio: { max: 300 },
      image: IMAGE_REQUIRED,
      socialX: { max: 300 },
      socialDribbble: { max: 300 },
      socialLinkedin: { max: 300 },
      portfolio: { max: 300 },
      github: { max: 300 },
    },
    seed: [
      {
        id: 'sienna-cruz',
        name: 'Sienna Cruz',
        role: 'Brand designer',
        location: 'Lisbon',
        bio: 'Builds identity systems that hold up from a favicon to a billboard.',
        image: '/images/team/sienna.jpg',
      },
      {
        id: 'leo-martin',
        name: 'Leo Martin',
        role: 'Head of design',
        location: 'Berlin',
        bio: 'Sets the visual direction and keeps every screen true to it.',
        image: '/images/team/leo.jpg',
      },
      {
        id: 'elena-rostova',
        name: 'Elena Rostova',
        role: 'Motion director',
        location: 'Prague',
        bio: 'Adds movement that explains the interface instead of decorating it.',
        image: '/images/team/elena.jpg',
      },
      {
        id: 'tobias-nguyen',
        name: 'Tobias Nguyen',
        role: 'Lead developer',
        location: 'Singapore',
        bio: 'Turns finished designs into fast, accessible production code.',
        image: '/images/team/tobias.jpg',
      },
      {
        id: 'marcus-vance',
        name: 'Marcus Vance',
        role: 'Design technologist',
        location: 'Toronto',
        bio: 'Maintains the tokens and components your team keeps using after launch.',
        image: '/images/team/marcus.jpg',
      },
    ],
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    description: 'Client quotes shown in the "In their words" carousel.',
    listKey: 'items',
    schema: {
      id: { required: true, max: 80 },
      lead: { required: true, max: 300 },
      rest: { max: 400 },
      name: { required: true, max: 80 },
      role: { required: true, max: 120 },
      image: IMAGE_REQUIRED,
      rating: { max: 3 },
    },
    seed: [
      {
        id: 'liam-chen',
        lead: 'We were struggling to create a unified design experience until we worked with neoxis.',
        rest: 'The team not only brought consistency but elevated every screen with thoughtful detail.',
        name: 'Liam Chen',
        role: 'Product Manager, NovaStack',
        image: '/images/team/leo.jpg',
        rating: '5',
      },
      {
        id: 'marco-diaz',
        lead: 'neoxis turned a scattered brand into one clear, confident voice.',
        rest: 'Our launch landed better than any campaign we have run before.',
        name: 'Marco Diaz',
        role: 'Founder, Crona Labs',
        image: '/images/team/tobias.jpg',
        rating: '5',
      },
      {
        id: 'sofia-reyes',
        lead: 'They listened first, then designed something we could never have imagined.',
        rest: 'Every workshop felt like a step forward, never a detour.',
        name: 'Sofia Reyes',
        role: 'Head of Growth, Mercury',
        image: '/images/team/elena.jpg',
        rating: '5',
      },
      {
        id: 'hannah-lee',
        lead: 'Our conversion rate doubled within weeks of the redesign going live.',
        rest: 'The attention to detail across mobile and desktop is remarkable.',
        name: 'Hannah Lee',
        role: 'CMO, BookStore',
        image: '/images/team/kate.jpg',
        rating: '5',
      },
    ],
  },
  {
    key: 'faqs',
    label: 'FAQs',
    description: 'Questions in the FAQ accordion and the FAQPage JSON-LD.',
    listKey: 'items',
    schema: {
      id: { required: true, max: 80 },
      question: { required: true, max: 240 },
      answer: { required: true, max: 800 },
    },
    seed: [
      {
        id: 'progress',
        question: 'What does the neoxis workflow look like?',
        answer: 'Zero gatekeeping or bureaucratic bloat. We kick off with an async vibe check and product mapping, sprint in high-tempo Figma cycles, and drop updates via Slack and Loom so you are never left guessing.',
      },
      {
        id: 'delivery',
        question: 'How fast do you actually ship?',
        answer: 'Sprint MVPs land in 4–7 business days, full scale overhauls wrap in about 15 days, and larger ecosystems roll out in agile phases across 3–6 months. We never ghost, and we never miss launch windows.',
      },
      {
        id: 'services',
        question: 'What is in your actual creative stack?',
        answer: 'Full-stack digital craft: brand worlds, kinetic motion, high-converting web apps, tactile iOS/Android interfaces, and tokenized design systems that scale effortlessly.',
      },
      {
        id: 'dislike',
        question: 'What happens if the first draft does not hit?',
        answer: 'We do not do fragile egos. Every engagement includes dedicated iteration sprints. We test, refine, and iterate with you until the craft is 100% dialled in before anything goes to production.',
      },
      {
        id: 'refund',
        question: 'What is your refund policy?',
        answer: 'If we have not officially kicked off sprint work, you get a 100% instant refund. Once kickoff commences, fees are fairly prorated to deliverables completed. Total transparency, always.',
      },
    ],
  },
  {
    key: 'hero',
    label: 'Hero',
    description: 'Hero slider cards and the stats bar under the hero.',
    listKey: 'items',
    schema: {
      id: { required: true, max: 80 },
      number: { max: 8 },
      title: { required: true, max: 120 },
      subtitle: { max: 160 },
      image: IMAGE_REQUIRED,
      logo: { max: 20 },
    },
    seed: [
      {
        id: '01',
        number: '01',
        title: 'Track. Flex. Scale.',
        subtitle: 'Next-Gen Fintech UI',
        image: '/images/ui/card-mobile.jpg',
      },
      {
        id: '02',
        number: '02',
        title: 'Aurea Studio',
        subtitle: '3D Worlds & Visual Identity',
        image: '/images/ui/card-aurea.jpg',
        logo: 'aurea',
      },
      {
        id: '03',
        number: '03',
        title: 'Aura Spatial',
        subtitle: 'Spatial OS & Tactile Interface',
        image: '/images/ui/card-spatial.jpg',
        logo: 'aura',
      },
    ],
  },
  {
    key: 'heroStats',
    label: 'Stats Bar',
    description: 'The four stat tiles directly under the hero.',
    listKey: 'items',
    schema: {
      id: { required: true, max: 80 },
      value: { required: true, max: 20 },
      label: { required: true, max: 80 },
      icon: { max: 20 },
    },
    seed: [
      { id: 'projects', value: '50+', label: 'Drops Shipped', icon: 'starburst' },
      { id: 'clients', value: '30+', label: 'Obsessed Clients', icon: 'users' },
      { id: 'experience', value: '8+', label: 'Years In The Game', icon: 'rocket' },
      { id: 'countries', value: '15+', label: 'Global Footprint', icon: 'globe' },
    ],
  },
];

export const SECTION_KEYS = SECTIONS.map((s) => s.key);

export const getSectionDef = (key: string): SectionDef | undefined =>
  SECTIONS.find((s) => s.key === key);
