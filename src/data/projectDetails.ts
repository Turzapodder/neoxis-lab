import type { ProjectDetail } from '@/types/content';

// High-resolution showcase assets for Space project (direct from template https://unusually.webflow.io/project/space)
import spaceHero1 from '@/assets/images/projects/space-hero-1.jpg';
import spaceHero2 from '@/assets/images/projects/space-hero-2.jpg';
import spaceGallery1 from '@/assets/images/projects/space-gallery-1.jpg';
import spaceGallery2 from '@/assets/images/projects/space-gallery-2.jpg';
import spaceGallery3 from '@/assets/images/projects/space-gallery-3.jpg';
import spaceClient from '@/assets/images/projects/space-client.jpg';

// Fallback project assets
import neonFrameImg from '@/assets/images/work/neon-frame.jpg';
import musicOsImg from '@/assets/images/work/music-os.jpg';
import botlyAppImg from '@/assets/images/work/botly-app.jpg';
import cureaStudioImg from '@/assets/images/work/curea-studio.jpg';
import sosIdentityImg from '@/assets/images/work/sos-identity.jpg';

export const SPACE_PROJECT_DETAIL: ProjectDetail = {
  id: 'space',
  title: 'Space',
  subtitle: '"Through thoughtful design and clear storytelling, we turned the client’s goals into impactful visual communication."',
  service: 'Design',
  industry: 'Tech',
  year: '2025',
  liveUrl: 'https://webflow.com/templates/designers/flowaze',
  liveLabel: 'Space',
  heroImage1: spaceHero1,
  heroImage2: spaceHero2,
  purpose: {
    heading: 'Project Purpose',
    description: [
      'Through focused systems design and high-cadence prototyping, we transformed complex spatial interfaces into tactile, human-centered journeys. The goal was to build a cohesive visual vernacular that scales seamlessly across responsive environments.',
      'Our team deconstructed the client’s legacy user touchpoints, introducing dynamic depth hierarchy, fluid kinetic transitions, and modern typographic balance that commands user focus and drives conversion.',
    ],
    bullets: [
      'Scalable design token architecture across platforms',
      'Dynamic fluid kinetic micro-animations & feedback loops',
      'High-contrast spatial hierarchy and typography system',
    ],
  },
  purposeImages: [spaceGallery1, spaceGallery2],
  goals: {
    heading: 'Achieved Goals',
    description: [
      'We achieved a 4.8x increase in user session dwell time, 38% decrease in onboarding drop-offs, and an industry-acclaimed brand presence celebrated across design awards.',
      'By anchoring the visual identity in modern minimalism and tactile digital textures, the final product establishes a benchmark in modern interactive tech design.',
    ],
    points: [
      'Engineered an unified design system with 120+ modular UI components',
      'Achieved sub-100ms kinetic interaction response benchmarks',
      'Shipped comprehensive brand guidelines and interactive spatial guidelines',
    ],
  },
  testimonial: {
    quote: '"Through thoughtful design and clear storytelling, we turned our vision into an unforgettable visual communication system that our users genuinely love."',
    clientName: 'Daniel Roberts',
    clientRole: 'CEO',
    clientImage: spaceClient,
  },
  showcaseImage: spaceGallery3,
  nextProject: {
    id: 'mobile',
    title: 'Mobile',
  },
};

export const PROJECT_DETAILS_MAP: Record<string, ProjectDetail> = {
  space: SPACE_PROJECT_DETAIL,
  mobile: {
    ...SPACE_PROJECT_DETAIL,
    id: 'mobile',
    title: 'Mobile OS',
    subtitle: '"Crafting tactile, next-generation mobile interactions and sensory feedback systems for millions of daily active users."',
    service: 'Mobile Design & Motion',
    industry: 'Fintech & OS',
    year: '2024',
    liveLabel: 'Mobile OS',
    heroImage1: botlyAppImg,
    heroImage2: spaceHero2,
    purposeImages: [spaceGallery2, spaceGallery1],
    showcaseImage: musicOsImg,
    nextProject: {
      id: 'neon-frame-system',
      title: 'Neon Frame',
    },
  },
  'neon-frame-system': {
    ...SPACE_PROJECT_DETAIL,
    id: 'neon-frame-system',
    title: 'Neon Frame System',
    subtitle: '"Reinventing spatial web typography and chromatic lighting engines for the spatial computing era."',
    service: 'Creative Direction & WebGL',
    industry: 'Spatial Tech',
    year: '2025',
    liveLabel: 'Neon Frame',
    heroImage1: neonFrameImg,
    heroImage2: spaceHero2,
    purposeImages: [spaceGallery1, spaceGallery2],
    showcaseImage: spaceGallery3,
    nextProject: {
      id: 'music-os-ai',
      title: 'Music OS AI',
    },
  },
  'music-os-ai': {
    ...SPACE_PROJECT_DETAIL,
    id: 'music-os-ai',
    title: 'Music OS AI',
    subtitle: '"AI-powered neural sound synthesis paired with responsive kinetic UI designed for modern creators."',
    service: 'AI Product Design',
    industry: 'Audio Tech',
    year: '2024',
    liveLabel: 'Music OS',
    heroImage1: musicOsImg,
    heroImage2: spaceHero2,
    purposeImages: [spaceGallery2, spaceGallery1],
    showcaseImage: cureaStudioImg,
    nextProject: {
      id: 'botly-port-app',
      title: 'Botly App',
    },
  },
  'botly-port-app': {
    ...SPACE_PROJECT_DETAIL,
    id: 'botly-port-app',
    title: 'Botly Port App',
    subtitle: '"Tactile mobile OS and micro-interaction suite redefining robotics control through playful ergonomics."',
    service: 'Mobile Experience',
    industry: 'Robotics',
    year: '2024',
    liveLabel: 'Botly App',
    heroImage1: botlyAppImg,
    heroImage2: spaceHero2,
    purposeImages: [spaceGallery1, spaceGallery2],
    showcaseImage: sosIdentityImg,
    nextProject: {
      id: 'curea-studio',
      title: 'Curea Studio',
    },
  },
  'curea-studio': {
    ...SPACE_PROJECT_DETAIL,
    id: 'curea-studio',
    title: 'Curea Studio',
    subtitle: '"An editorial digital sanctuary celebrating avant-garde architecture, sculptural form, and sensory pacing."',
    service: 'Brand Identity & Web',
    industry: 'Architecture & Art',
    year: '2023',
    liveLabel: 'Curea Studio',
    heroImage1: cureaStudioImg,
    heroImage2: spaceHero2,
    purposeImages: [spaceGallery2, spaceGallery1],
    showcaseImage: neonFrameImg,
    nextProject: {
      id: 'space',
      title: 'Space',
    },
  },
  'sos-core-identity-app': {
    ...SPACE_PROJECT_DETAIL,
    id: 'sos-core-identity-app',
    title: 'Sos Core Identity',
    subtitle: '"Next-generation iOS token system and high-velocity design language for decentralized autonomous ecosystems."',
    service: 'Brand Architecture',
    industry: 'Crypto & Web3',
    year: '2025',
    liveLabel: 'Sos Identity',
    heroImage1: sosIdentityImg,
    heroImage2: spaceHero2,
    purposeImages: [spaceGallery1, spaceGallery2],
    showcaseImage: musicOsImg,
    nextProject: {
      id: 'space',
      title: 'Space',
    },
  },
};

/** Case study for `id`; unknown or missing ids fall back to Space. */
export const getProjectDetail = (id?: string): ProjectDetail =>
  id && Object.hasOwn(PROJECT_DETAILS_MAP, id) ? PROJECT_DETAILS_MAP[id] : SPACE_PROJECT_DETAIL;
