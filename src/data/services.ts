import studioFactImg from '@/assets/images/studio-fact-work.jpg';
import meetMindsTeamImg from '@/assets/images/meet-minds-team.jpg';
import cardAureaImg from '@/assets/images/card-aurea.jpg';
import cardSpatialImg from '@/assets/images/card-spatial.jpg';
import cardMobileImg from '@/assets/images/card-mobile.jpg';
import type { ProcessStep, Service } from '@/types/content';

export const SERVICES: Service[] = [
  {
    id: 'branding-design',
    title: 'Branding Design',
    tags: ['Brand Strategy', 'Visual Identity'],
    description:
      'Distinctive brand systems, from strategy to visual identity, built to make your business instantly recognizable.',
    image: studioFactImg,
  },
  {
    id: 'digital-design',
    title: 'Digital Design',
    tags: ['Motion Design', 'Accessibility'],
    description:
      'Expressive digital assets and motion that feel alive, inclusive, and consistent across every touchpoint.',
    image: cardAureaImg,
  },
  {
    id: 'web-design',
    title: 'Web Design',
    tags: ['Landing Pages', 'Portfolio Sites'],
    description:
      'Modern, responsive, and user-friendly websites designed to engage visitors and drive conversions.',
    image: cardSpatialImg,
  },
  {
    id: 'ui-ux-design',
    title: 'UI,UX design',
    tags: ['User Research', 'Wireframing'],
    description:
      'Research-led interfaces and flows that turn complex products into intuitive, delightful experiences.',
    image: cardMobileImg,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { id: 'art-direction', label: 'Project Kick-off', title: 'Art Direction and Wireframing', image: studioFactImg },
  { id: 'design-prototype', label: 'Design Process', title: 'Design and Prototype Process', image: meetMindsTeamImg },
  { id: 'testing', label: 'Testing', title: 'Product Testing, Quality Control', image: cardMobileImg },
];
