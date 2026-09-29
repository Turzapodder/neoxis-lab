import { kateImg, leoImg, tobiasImg, elenaImg } from '@/lib/images';
import type { ClientStat, Testimonial } from '@/types/content';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'liam-chen',
    lead: 'We were struggling to create a unified design experience until we worked with neoxis.',
    rest: 'The team not only brought consistency but elevated every screen with thoughtful detail.',
    name: 'Liam Chen',
    role: 'Product Manager, NovaStack',
    image: leoImg,
    rating: 5,
  },
  {
    id: 'marco-diaz',
    lead: 'neoxis turned a scattered brand into one clear, confident voice.',
    rest: 'Our launch landed better than any campaign we have run before.',
    name: 'Marco Diaz',
    role: 'Founder, Crona Labs',
    image: tobiasImg,
    rating: 5,
  },
  {
    id: 'sofia-reyes',
    lead: 'They listened first, then designed something we could never have imagined.',
    rest: 'Every workshop felt like a step forward, never a detour.',
    name: 'Sofia Reyes',
    role: 'Head of Growth, Mercury',
    image: elenaImg,
    rating: 5,
  },
  {
    id: 'hannah-lee',
    lead: 'Our conversion rate doubled within weeks of the redesign going live.',
    rest: 'The attention to detail across mobile and desktop is remarkable.',
    name: 'Hannah Lee',
    role: 'CMO, BookStore',
    image: kateImg,
    rating: 5,
  },
];

export const TESTIMONIAL_RATING = { score: '4.9', reviews: '60+' } as const;

/** Outcomes shown under the quotes. */
export const CLIENT_STATS: ClientStat[] = [
  { id: 'roi', value: '95%', caption: 'of clients report better ROI within a month of launch' },
  { id: 'retention', value: '88%', caption: 'come back to us for a second or third project' },
];
