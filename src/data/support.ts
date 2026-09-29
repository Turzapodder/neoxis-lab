import type { Faq } from '@/types/content';
import { SERVICES } from './services';

export const FAQS: Faq[] = [
  {
    id: 'progress',
    question: 'What does the neoxis workflow look like?',
    answer: 'Zero gatekeeping or bureaucratic bloat. We kick off with an async vibe check and product mapping, sprint in high-tempo Figma cycles, and drop updates via Slack and Loom so you are never left guessing.',
  },
  {
    id: 'delivery',
    question: 'How fast do you actually ship?',
    answer: 'Sprint MVPs land in 4–7 business days, full scale overhauls wrap in about 15 days, and larger ecosystems roll out in agile phases across 3–6 months. We never ghost, and we never miss launch windows.',
  },
  {
    id: 'services',
    question: 'What is in your actual creative stack?',
    answer: 'Full-stack digital craft: brand worlds, kinetic motion, high-converting web apps, tactile iOS/Android interfaces, and tokenized design systems that scale effortlessly.',
  },
  {
    id: 'dislike',
    question: 'What happens if the first draft does not hit?',
    answer: 'We do not do fragile egos. Every engagement includes dedicated iteration sprints. We test, refine, and iterate with you until the craft is 100% dialled in before anything goes to production.',
  },
  {
    id: 'refund',
    question: 'What is your refund policy?',
    answer: 'If we have not officially kicked off sprint work, you get a 100% instant refund. Once kickoff commences, fees are fairly prorated to deliverables completed. Total transparency, always.',
  },
];

export const BUDGET_OPTIONS = ['< $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '> $20,000'];

/** "What do you need?" options in the contact form. */
export const PROJECT_TYPES = [...SERVICES.map((service) => service.title), 'Something else'];
