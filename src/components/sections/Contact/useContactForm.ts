import { useState, type FormEvent } from 'react';
import { useTransientFlag } from '@/hooks/useTransientFlag';

/** How long the "Brief received" confirmation stays on the submit button. */
const CONFIRMATION_MS = 5000;

export function useContactForm() {
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, showConfirmation] = useTransientFlag(CONFIRMATION_MS);

  const toggleProjectType = (type: string) =>
    setProjectTypes((current) =>
      current.includes(type) ? current.filter((t) => t !== type) : [...current, type],
    );

  const toggleBudget = (option: string) =>
    setBudget((current) => (current === option ? null : option));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          projectTypes,
          budget,
          message,
          source: 'contact_section',
        }),
      });

      const data = (await res.json().catch(() => null)) as { error?: string; success?: boolean } | null;

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to submit inquiry. Please try again.');
      }

      showConfirmation();
      form.reset();
      setProjectTypes([]);
      setBudget(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    projectTypes,
    toggleProjectType,
    budget,
    toggleBudget,
    submitting,
    submitted,
    error,
    handleSubmit,
  };
}
