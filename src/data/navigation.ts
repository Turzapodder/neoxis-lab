import { SECTION_IDS } from '@/constants/sections';
import type { ExternalLink, MenuItem, NavLink, NavTab } from '@/types/content';

export const NAV_TABS: NavTab[] = [
  { id: 'Studio', label: 'Studio', target: SECTION_IDS.studio },
  { id: 'Project', label: 'Project', badge: '(12)', target: SECTION_IDS.selectedWork },
  { id: 'Service', label: 'Service', target: SECTION_IDS.services },
  { id: 'Team', label: 'Team', target: SECTION_IDS.team },
  { id: 'Blog', label: 'Blog' },
];

export const DEFAULT_NAV_TAB = NAV_TABS[0].id;

export const MENU_ITEMS: MenuItem[] = [
  { number: '01', title: 'Studio', desc: 'About our design philosophy & culture' },
  { number: '02', title: 'Projects', desc: 'Selected works, digital products & case studies' },
  { number: '03', title: 'Services', desc: 'Brand identity, 3D & UI/UX engineering' },
  { number: '04', title: 'Articles / Blog', desc: 'Insights, design perspectives & updates' },
  { number: '05', title: 'Contact', desc: 'Start a new project or say hello' },
];

export const MENU_SOCIAL_LINKS: ExternalLink[] = [
  { label: 'Twitter (X)', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Dribbble', href: '#' },
];

export const FOOTER_NAV_LINKS: NavLink[] = [
  { label: 'Home', target: 'top' },
  { label: 'Studio', target: SECTION_IDS.studio },
  { label: 'Projects', target: SECTION_IDS.selectedWork },
  { label: 'Blog', target: SECTION_IDS.testimonials },
];

export const FOOTER_SOCIAL_LINKS: ExternalLink[] = [
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
];
