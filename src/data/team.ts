import kateImg from '@/assets/images/team/kate.jpg';
import leoImg from '@/assets/images/team/leo.jpg';
import siennaImg from '@/assets/images/team/sienna.jpg';
import tobiasImg from '@/assets/images/team/tobias.jpg';
import elenaImg from '@/assets/images/team/elena.jpg';
import marcusImg from '@/assets/images/team/marcus.jpg';
import type { TeamMember } from '@/types/content';

/** People featured in the team spotlight inside the services section. */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'sienna-cruz',
    name: 'Sienna Cruz',
    role: 'Brand designer',
    location: 'Lisbon',
    bio: 'Builds identity systems that hold up from a favicon to a billboard.',
    image: siennaImg,
  },
  {
    id: 'leo-martin',
    name: 'Leo Martin',
    role: 'Head of design',
    location: 'Berlin',
    bio: 'Sets the visual direction and keeps every screen true to it.',
    image: leoImg,
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Motion director',
    location: 'Prague',
    bio: 'Adds movement that explains the interface instead of decorating it.',
    image: elenaImg,
  },
  {
    id: 'tobias-nguyen',
    name: 'Tobias Nguyen',
    role: 'Lead developer',
    location: 'Singapore',
    bio: 'Turns finished designs into fast, accessible production code.',
    image: tobiasImg,
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Design technologist',
    location: 'Toronto',
    bio: 'Maintains the tokens and components your team keeps using after launch.',
    image: marcusImg,
  },
];

/** Avatar sets reused in small "team" stacks across sections. */
export const TEAM_AVATARS = {
  meetTheMinds: [kateImg, leoImg, tobiasImg],
  contact: [kateImg, leoImg, siennaImg, marcusImg],
} as const;
