import cardMobileImg from '@/assets/images/card-mobile.jpg';
import cardAureaImg from '@/assets/images/card-aurea.jpg';
import cardSpatialImg from '@/assets/images/card-spatial.jpg';
import type { FloatingCard, HeroProject, StatItem } from '@/types/content';

export const HERO_PROJECTS: HeroProject[] = [
  {
    id: '01',
    number: '01',
    title: 'Track. Flex. Scale.',
    subtitle: 'Next-Gen Fintech UI',
    image: cardMobileImg,
  },
  {
    id: '02',
    number: '02',
    title: 'Aurea Studio',
    subtitle: '3D Worlds & Visual Identity',
    image: cardAureaImg,
    logo: 'aurea',
  },
  {
    id: '03',
    number: '03',
    title: 'Aura Spatial',
    subtitle: 'Spatial OS & Tactile Interface',
    image: cardSpatialImg,
    logo: 'aura',
  },
];

/** Clones of the hero cards that fly into the studio statement on scroll. */
export const FLOATING_CARDS: FloatingCard[] = [
  { src: cardMobileImg, alt: 'Track. Flex. Scale. Next-Gen Fintech UI', z: 30 },
  { src: cardAureaImg, alt: 'Aurea Studio 3D Worlds & Visual Identity', z: 20 },
  { src: cardSpatialImg, alt: 'Aura Spatial Tactile Interface', z: 10 },
];

export const HERO_STATS: StatItem[] = [
  { id: 'projects', value: '50+', label: 'Drops Shipped', icon: 'starburst' },
  { id: 'clients', value: '30+', label: 'Obsessed Clients', icon: 'users' },
  { id: 'experience', value: '8+', label: 'Years In The Game', icon: 'rocket' },
  { id: 'countries', value: '15+', label: 'Global Footprint', icon: 'globe' },
];
