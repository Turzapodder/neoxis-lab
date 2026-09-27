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
    title: 'Branding Design',
    tags: ['Brand Strategy', 'Visual Identity'],
    slides: [
      {
        id: 'brand-strategy',
        label: 'Strategy',
        title: 'Brand strategy',
        description: 'Positioning, voice and naming worked out before anything gets drawn.',
        image: studioFactImg,
      },
      {
        id: 'logo-systems',
        label: 'Logo',
        title: 'Logo systems',
        description: 'Marks that stay legible from an app icon to a storefront sign.',
        image: cardAureaImg,
      },
      {
        id: 'visual-identity',
        label: 'Identity',
        title: 'Visual identity',
        description: 'Type, color and imagery rules that make every touchpoint feel related.',
        image: cureaStudioImg,
      },
      {
        id: 'brand-guidelines',
        label: 'Guidelines',
        title: 'Brand guidelines',
        description: 'A handbook your team can follow without calling us for every decision.',
        image: sosIdentityImg,
      },
    ],
  },
  {
    id: 'digital-design',
    title: 'Digital Design',
    tags: ['Motion Design', 'Accessibility'],
    slides: [
      {
        id: 'motion-design',
        label: 'Motion',
        title: 'Motion design',
        description: 'Animation that guides attention and explains what just changed.',
        image: musicOsImg,
      },
      {
        id: 'campaign-assets',
        label: 'Campaigns',
        title: 'Campaign assets',
        description: 'Social, display and launch visuals produced as one consistent set.',
        image: neonFrameImg,
      },
      {
        id: 'accessibility',
        label: 'Accessibility',
        title: 'Accessible by default',
        description: 'Contrast, focus states and motion settings checked on every screen.',
        image: cardSpatialImg,
      },
      {
        id: 'illustration',
        label: 'Illustration',
        title: 'Illustration and 3D',
        description: 'Custom artwork that replaces stock imagery and fits your brand.',
        image: cardAureaImg,
      },
    ],
  },
  {
    id: 'web-design',
    title: 'Web Design',
    tags: ['Landing Pages', 'Portfolio Sites'],
    slides: [
      {
        id: 'landing-pages',
        label: 'Landing',
        title: 'Landing pages',
        description: 'Modern, responsive, and user-friendly websites designed to engage visitors and drive conversions.',
        image: cardSpatialImg,
      },
      {
        id: 'portfolio-sites',
        label: 'Portfolio',
        title: 'Portfolio sites',
        description: 'Case-study layouts that let the work speak before the copy does.',
        image: neonFrameImg,
      },
      {
        id: 'ecommerce',
        label: 'Commerce',
        title: 'E-commerce',
        description: 'Product pages and checkouts designed to remove steps, not add them.',
        image: botlyAppImg,
      },
      {
        id: 'cms-builds',
        label: 'CMS',
        title: 'CMS builds',
        description: 'Sites your team can update in minutes without touching code.',
        image: meetMindsTeamImg,
      },
    ],
  },
  {
    id: 'ui-ux-design',
    title: 'UI,UX design',
    tags: ['User Research', 'Wireframing'],
    slides: [
      {
        id: 'user-research',
        label: 'Research',
        title: 'User research',
        description: 'Interviews and usability tests that show where people get stuck.',
        image: meetMindsTeamImg,
      },
      {
        id: 'wireframing',
        label: 'Wireframes',
        title: 'Wireframing',
        description: 'Flows mapped in low fidelity so decisions are cheap to change.',
        image: studioFactImg,
      },
      {
        id: 'mobile-apps',
        label: 'Mobile',
        title: 'Mobile apps',
        description: 'iOS and Android interfaces built around thumbs, not cursors.',
        image: cardMobileImg,
      },
      {
        id: 'design-systems',
        label: 'Systems',
        title: 'Design systems',
        description: 'Components and tokens that keep product and code in sync.',
        image: botlyAppImg,
      },
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { id: 'art-direction', label: 'Project Kick-off', title: 'Art Direction and Wireframing', image: studioFactImg },
  { id: 'design-prototype', label: 'Design Process', title: 'Design and Prototype Process', image: meetMindsTeamImg },
  { id: 'testing', label: 'Testing', title: 'Product Testing, Quality Control', image: cardMobileImg },
];
