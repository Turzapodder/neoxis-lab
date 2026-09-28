import { useState, type FormEvent } from 'react';
import { useTransientFlag } from '@/hooks/useTransientFlag';

/** How long the "Message sent" confirmation stays on the submit button. */
const CONFIRMATION_MS = 2500;

/**
 * Contact form state: multi-select project types, single-select budget and a
 * temporary "sent" confirmation. Submission is mocked; it clears the form without sending anything.
 */
export function useContactForm() {
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [submitted, showConfirmation] = useTransientFlag(CONFIRMATION_MS);

  const toggleProjectType = (type: string) =>
    setProjectTypes((current) => (current.includes(type) ? current.filter((t) => t !== type) : [...current, type]));

  const toggleBudget = (option: string) => setBudget((current) => (current === option ? null : option));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showConfirmation();
    e.currentTarget.reset();
    setProjectTypes([]);
    setBudget(null);
  };

  return { projectTypes, toggleProjectType, budget, toggleBudget, submitted, handleSubmit };
}
