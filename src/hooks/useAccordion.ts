import { useCallback, useState } from 'react';

/** Single-open accordion state: opening one item closes the others. */
export function useAccordion(initialId: string | null = null) {
  const [openId, setOpenId] = useState<string | null>(initialId);

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return { openId, toggle };
}
