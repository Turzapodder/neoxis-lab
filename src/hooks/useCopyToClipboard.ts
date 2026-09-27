import { useCallback } from 'react';
import { useTransientFlag } from './useTransientFlag';

/** Copies text and exposes a short-lived `copied` flag for feedback. */
export function useCopyToClipboard(feedbackMs = 2000) {
  const [copied, showCopied] = useTransientFlag(feedbackMs);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        showCopied();
      } catch {
        // Clipboard can be blocked (insecure context, permissions); the text stays visible to copy by hand
      }
    },
    [showCopied],
  );

  return { copied, copy };
}
