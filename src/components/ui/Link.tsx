import React from 'react';
import { navigate } from '@/lib/router';

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** In-app path, optionally with a section hash, e.g. `/#services-section`. */
  to: string;
}

/** Anchor that navigates inside the app. Modified clicks (new tab, new window) keep browser behavior. */
export const Link: React.FC<LinkProps> = ({ to, onClick, ...rest }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    const opensElsewhere = (rest.target && rest.target !== '_self') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.defaultPrevented || event.button !== 0 || opensElsewhere) return;

    event.preventDefault();
    navigate(to);
  };

  return <a {...rest} href={to} onClick={handleClick} />;
};
