'use client';

import React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useSiteNavigation } from '@/hooks/useSiteNavigation';

interface LinkProps extends Omit<React.ComponentProps<typeof NextLink>, 'href'> {
  /** In-app path, optionally with a section hash, e.g. `/#services-section`. */
  to: string;
}

/**
 * Next.js link that scrolls smoothly when it points into the current page.
 * Links to other pages keep Next.js behavior (prefetching, client transitions);
 * modified clicks (new tab, new window) keep browser behavior.
 */
export const Link: React.FC<LinkProps> = ({ to, onClick, ...rest }) => {
  const pathname = usePathname();
  const navigate = useSiteNavigation();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    const opensElsewhere = (rest.target && rest.target !== '_self') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.defaultPrevented || event.button !== 0 || opensElsewhere) return;
    if (new URL(to, window.location.href).pathname !== pathname) return;

    event.preventDefault();
    navigate(to);
  };

  return <NextLink {...rest} href={to} onClick={handleClick} />;
};
