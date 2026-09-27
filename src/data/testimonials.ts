import kateImg from '@/assets/images/team/kate.jpg';
import leoImg from '@/assets/images/team/leo.jpg';
import tobiasImg from '@/assets/images/team/tobias.jpg';
import elenaImg from '@/assets/images/team/elena.jpg';
import type { ClientStat, Partner, Testimonial } from '@/types/content';
import { TEAM_AVATARS } from './team';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'liam-chen',
    lead: 'We were struggling to create a unified design experience until we worked with Ezendo.',
    rest: 'The team not only brought consistency but elevated every screen with thoughtful detail.',
    name: 'Liam Chen',
    role: 'Product Manager, NovaStack',
    image: leoImg,
    rating: 5,
  },
  {
    id: 'marco-diaz',
    lead: 'Ezendo turned a scattered brand into one clear, confident voice.',
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

export const CLIENT_STATS: ClientStat[] = [
  { id: 'happy-people', label: 'Happy people', value: '3M+', avatars: TEAM_AVATARS.happyPeople },
  { id: 'roi', label: 'ROI Improvement', value: '95%', caption: 'Clients reported better ROI within 1 month.' },
  { id: 'retention', label: 'Client Retention', value: '88%', caption: 'Come back for second or third projects.' },
];

export const PARTNERS: Partner[] = [
  { name: 'zantic', mark: 'zantic', className: 'text-xl font-semibold lowercase' },
  { name: 'BookStore', mark: 'bookstore', className: 'text-lg font-medium' },
  { name: 'Wager', mark: 'wager', className: 'text-base font-semibold' },
  { name: 'Wager', mark: 'wager', className: 'text-base font-semibold' },
  { name: 'Crona', mark: 'crona', className: 'text-base font-semibold' },
  { name: 'Mercury', mark: 'mercury', className: 'text-base font-semibold' },
  { name: 'Crona', mark: 'crona', className: 'text-base font-semibold' },
];
