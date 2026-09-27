import kateImg from '@/assets/images/team/kate.jpg';
import leoImg from '@/assets/images/team/leo.jpg';
import siennaImg from '@/assets/images/team/sienna.jpg';
import tobiasImg from '@/assets/images/team/tobias.jpg';
import randalImg from '@/assets/images/team/randal.jpg';
import elenaImg from '@/assets/images/team/elena.jpg';
import marcusImg from '@/assets/images/team/marcus.jpg';
import type { Mind, TeamMember } from '@/types/content';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'kate-lee-cobe',
    name: 'Kate Lee Cobe',
    role: 'Founder Kudos',
    category: 'Leadership',
    image: kateImg,
    rating: 5,
    quote:
      'Design is not just what it looks like, it is how every interaction resonates with purpose, craft, and human connection.',
    bio: 'Pioneering holistic creative strategy and digital craft for visionary ventures.',
    accentColor: '#F59E0B',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'leo-martin',
    name: 'Leo Martin',
    role: 'Head of Design',
    category: 'Design',
    image: leoImg,
    rating: 5,
    quote:
      'Pushing boundaries between brutalist precision and kinetic fluidity to create memorable digital identities that stand the test of time.',
    bio: 'Art director focusing on typography systems and interactive motion design.',
    accentColor: '#EC4899',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'sienna-cruz',
    name: 'Sienna Cruz',
    role: 'Brand Designer',
    category: 'Branding',
    image: siennaImg,
    rating: 5,
    quote:
      'Transforming abstract visions into cohesive, timeless design languages that stand out in crowded markets.',
    bio: 'Specialist in high-impact brand identities, packaging, and editorial guidelines.',
    accentColor: '#8B5CF6',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'tobias-nguyen',
    name: 'Tobias Nguyen',
    role: 'Lead Developer',
    category: 'Engineering',
    image: tobiasImg,
    rating: 5,
    quote:
      'Bridging the gap between ambitious visual design and silky 60fps web performance across all platforms.',
    bio: 'Creative technologist with deep expertise in WebGL, GSAP, and reactive systems.',
    accentColor: '#3B82F6',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'randal-boucher',
    name: 'Randal Boucher',
    role: 'UI Designer',
    category: 'Product Design',
    image: randalImg,
    rating: 5,
    quote:
      'This course helped me understand design from a real industry perspective. The projects improved my portfolio significantly.',
    bio: 'Senior UI/UX specialist focused on tactile micro-interactions and design systems.',
    accentColor: '#EA580C',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Motion Director',
    category: 'Motion & 3D',
    image: elenaImg,
    rating: 5,
    quote:
      'Adding soul and momentum to modern interfaces through calculated micro-physics and kinetic storytelling.',
    bio: '3D and motion artist crafting cinematic interactions and generative visuals.',
    accentColor: '#10B981',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Design Technologist',
    category: 'Systems',
    image: marcusImg,
    rating: 5,
    quote:
      'Crafting scalable architecture and modular design systems that empower high-growth engineering teams.',
    bio: 'Specializing in design tokens, component scalability, and frontend efficiency.',
    accentColor: '#6366F1',
    socials: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
];

/** Staggered "Meet The Minds" cards in the dark services section. */
export const MINDS: Mind[] = [
  { id: 'jame-nolan', name: 'Jame Nolan', role: 'Web Designer', hashtag: '#theleader', image: siennaImg, offset: 'lg:mt-0' },
  { id: 'jame-obsbon', name: 'Jame Obsbon', role: 'UI Designer', hashtag: '#dynamic', image: leoImg, offset: 'lg:mt-20' },
  { id: 'bruno-santost', name: 'Bruno Santost', role: 'Art Director', hashtag: '#thecreative', image: marcusImg, offset: 'lg:mt-32' },
];

/** Avatar sets reused in small "team" stacks across sections. */
export const TEAM_AVATARS = {
  meetTheMinds: [kateImg, leoImg, tobiasImg],
  happyPeople: [kateImg, randalImg, tobiasImg],
  contact: [kateImg, leoImg, siennaImg, marcusImg],
} as const;
