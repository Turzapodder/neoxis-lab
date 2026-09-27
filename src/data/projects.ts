import neonFrameImg from '@/assets/images/work/neon-frame.jpg';
import musicOsImg from '@/assets/images/work/music-os.jpg';
import botlyAppImg from '@/assets/images/work/botly-app.jpg';
import cureaStudioImg from '@/assets/images/work/curea-studio.jpg';
import sosIdentityImg from '@/assets/images/work/sos-identity.jpg';
import type { SelectedProject } from '@/types/content';

export const SELECTED_PROJECTS: SelectedProject[] = [
  {
    id: 'neon-frame-system',
    num: '01.',
    title: 'Neon Frame System.',
    year: '2025',
    category: 'Interactive Web Platform',
    image: neonFrameImg,
    colSpanClass: 'lg:col-span-7 xl:col-span-8',
  },
  {
    id: 'music-os-ai',
    num: '02.',
    title: 'Music OS AI.',
    year: '2024',
    category: 'Brand & Visual Identity',
    image: musicOsImg,
    colSpanClass: 'lg:col-span-5 xl:col-span-4',
  },
  {
    id: 'botly-port-app',
    num: '03.',
    title: 'Botly® Port App.',
    year: '2022',
    category: 'Mobile Product Design',
    image: botlyAppImg,
  },
  {
    id: 'curea-studio',
    num: '04.',
    title: 'Curea Studio',
    year: '2020',
    category: 'Editorial & Brand Art',
    image: cureaStudioImg,
  },
  {
    id: 'sos-core-identity-app',
    num: '05.',
    title: 'Sos Core Identity App.',
    year: '2024',
    category: 'Tactile iOS Application',
    image: sosIdentityImg,
  },
];

/** Number of projects shown in the featured (wide) top row. */
export const FEATURED_PROJECT_COUNT = 2;
