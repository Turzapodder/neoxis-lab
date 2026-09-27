import type { Faq } from '@/types/content';
import { SERVICES } from './services';

export const FAQS: Faq[] = [
  {
    id: 'progress',
    question: 'What’s the Ezando® progress like?',
    answer: 'I specialize in UX/UI design, web development, and branding for individuals and businesses.',
  },
  {
    id: 'delivery',
    question: 'Design delivery time estimate?',
    answer: 'Small projects ship in 4–7 days, standard projects in about 15 days, and larger engagements are scoped in phases over 3–6 months.',
  },
  {
    id: 'services',
    question: 'What services do you offer?',
    answer: 'Branding, digital and motion design, web design, and end-to-end UI/UX, from research and wireframes to production-ready files.',
  },
  {
    id: 'dislike',
    question: 'What if I don’t like design?',
    answer: 'Every plan includes review rounds. We iterate with you until the direction feels right before moving on.',
  },
  {
    id: 'refund',
    question: 'Are there any refund?',
    answer: 'If we have not started work, you get a full refund. After kickoff, refunds are prorated to the work delivered.',
  },
];

export const BUDGET_OPTIONS = ['< $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '> $20,000'];

/** "What do you need?" options in the contact form. */
export const PROJECT_TYPES = [...SERVICES.map((service) => service.title), 'Something else'];
