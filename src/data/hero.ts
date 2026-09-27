import cardMobileImg from '@/assets/images/card-mobile.jpg';
import cardAureaImg from '@/assets/images/card-aurea.jpg';
import cardSpatialImg from '@/assets/images/card-spatial.jpg';
import type { FloatingCard, HeroProject, StatItem } from '@/types/content';

export const HERO_PROJECTS: HeroProject[] = [
  {
    id: '01',
    number: '01',
    title: 'Track. Analyze. Optimize.',
    subtitle: 'Fintech Mobile Experience',
    image: cardMobileImg,
  },
  {
    id: '02',
    number: '02',
    title: 'Aurea Studio',
    subtitle: 'Brand Identity & 3D Experience',
    image: cardAureaImg,
    logo: 'aurea',
  },
  {
    id: '03',
    number: '03',
    title: 'Aura Spatial',
    subtitle: 'Spatial Hardware Interface',
    image: cardSpatialImg,
    logo: 'aura',
  },
];

/** Clones of the hero cards that fly into the studio statement on scroll. */
export const FLOATING_CARDS: FloatingCard[] = [
  { src: cardMobileImg, alt: 'Track. Analyze. Optimize. Fintech UI', z: 30 },
  { src: cardAureaImg, alt: 'Aurea Studio Brand Identity', z: 20 },
  { src: cardSpatialImg, alt: 'Aura Spatial Hardware Interface', z: 10 },
];

export const HERO_STATS: StatItem[] = [
  { id: 'projects', value: '50+', label: 'Projects Completed', icon: 'starburst' },
  { id: 'clients', value: '30+', label: 'Happy Clients', icon: 'users' },
  { id: 'experience', value: '8+', label: 'Years Experience', icon: 'rocket' },
  { id: 'countries', value: '15+', label: 'Countries Served', icon: 'globe' },
];
