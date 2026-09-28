import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A boolean that switches on when triggered and back off after `duration` ms.
 * Useful for "sent" confirmations. The timer is cleared on unmount.
 */
export function useTransientFlag(duration: number) {
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const trigger = useCallback(
    (onEnd?: () => void) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setActive(true);
      timerRef.current = setTimeout(() => {
        setActive(false);
        onEnd?.();
      }, duration);
    },
    [duration],
  );

  return [active, trigger] as const;
}
