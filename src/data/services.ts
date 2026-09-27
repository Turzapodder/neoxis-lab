import studioFactImg from '@/assets/images/studio-fact-work.jpg';
import meetMindsTeamImg from '@/assets/images/meet-minds-team.jpg';
import cardAureaImg from '@/assets/images/card-aurea.jpg';
import cardSpatialImg from '@/assets/images/card-spatial.jpg';
import cardMobileImg from '@/assets/images/card-mobile.jpg';
import neonFrameImg from '@/assets/images/work/neon-frame.jpg';
import musicOsImg from '@/assets/images/work/music-os.jpg';
import botlyAppImg from '@/assets/images/work/botly-app.jpg';
import cureaStudioImg from '@/assets/images/work/curea-studio.jpg';
import sosIdentityImg from '@/assets/images/work/sos-identity.jpg';
import type { ProcessStep, Service } from '@/types/content';

export const SERVICES: Service[] = [
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
        image: studioFactImg,
      },
      {
        id: 'logo-systems',
        label: 'Logo',
        title: 'Dynamic logo systems',
        description: 'Adaptive marks and kinetic vectors that pop from an app icon to huge street billboards.',
        image: cardAureaImg,
      },
      {
        id: 'visual-identity',
        label: 'Identity',
        title: 'Visual world-building',
        description: 'Curated type systems, high-taste palettes, and art direction that make your brand unmistakable.',
        image: cureaStudioImg,
      },
      {
        id: 'brand-guidelines',
        label: 'Guidelines',
        title: 'Living brand kits',
        description: 'Zero gatekeeping: interactive design tokens and guidelines your crew can actually ship with.',
        image: sosIdentityImg,
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
        image: musicOsImg,
      },
      {
        id: 'campaign-assets',
        label: 'Campaigns',
        title: 'Launch drops',
        description: 'High-converting launch assets, teaser visuals, and campaign collateral primed for virality.',
        image: neonFrameImg,
      },
      {
        id: 'accessibility',
        label: 'Accessibility',
        title: 'Inclusive by default',
        description: 'Contrast, focus states, and reduced-motion modes engineered right into every component.',
        image: cardSpatialImg,
      },
      {
        id: 'illustration',
        label: '3D Art',
        title: '3D & Spatial visuals',
        description: 'Custom 3D objects, tactile textures, and bespoke visual art that banish stock photos forever.',
        image: cardAureaImg,
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
        image: cardSpatialImg,
      },
      {
        id: 'portfolio-sites',
        label: 'Portfolio',
        title: 'Editorial showcases',
        description: 'Cinematic case-study layouts and interactive narratives that command instant authority.',
        image: neonFrameImg,
      },
      {
        id: 'ecommerce',
        label: 'Commerce',
        title: 'Frictionless commerce',
        description: 'Product drops and checkout loops stripped of friction to maximize impulse and retention.',
        image: botlyAppImg,
      },
      {
        id: 'cms-builds',
        label: 'CMS',
        title: 'Headless CMS stacks',
        description: 'Modern content engines your marketing team can publish to in seconds with zero dev pings.',
        image: meetMindsTeamImg,
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
        image: meetMindsTeamImg,
      },
      {
        id: 'wireframing',
        label: 'Flows',
        title: 'Rapid wireframing',
        description: 'Low-fidelity flows and prototypes mapped fast so big decisions stay cheap and agile.',
        image: studioFactImg,
      },
      {
        id: 'mobile-apps',
        label: 'Mobile',
        title: 'Tactile mobile apps',
        description: 'Thumb-friendly iOS and Android interfaces crafted for daily engagement and clean workflows.',
        image: cardMobileImg,
      },
      {
        id: 'design-systems',
        label: 'Systems',
        title: 'Tokenized systems',
        description: 'Production-ready component libraries in Figma and code that keep design and dev locked in sync.',
        image: botlyAppImg,
      },
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { id: 'art-direction', label: 'Phase 01 // Blueprint', title: 'Creative Direction & Architecture', image: studioFactImg },
  { id: 'design-prototype', label: 'Phase 02 // Sprints', title: 'High-Fidelity UI & Motion Craft', image: meetMindsTeamImg },
  { id: 'testing', label: 'Phase 03 // Shipping', title: 'Stress-Testing & Production Drop', image: cardMobileImg },
];
