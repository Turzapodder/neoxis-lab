'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MenuModal } from '@/components/modals/MenuModal';
import { ROUTES, sectionPath } from '@/constants/routes';
import { DEFAULT_NAV_TAB } from '@/data/navigation';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useNavigationScroll } from '@/hooks/useNavigationScroll';
import { useSiteNavigation } from '@/hooks/useSiteNavigation';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import type { NavTab } from '@/types/content';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

/** Navbar tab highlighted on pages other than home, by path prefix. Legal pages highlight none. */
const ROUTE_TABS: [prefix: string, tab: string][] = [[ROUTES.project, 'Project']];

/** Pages that open with a full-bleed hero, which the navbar overlays instead of sitting above. */
const opensWithHero = (pathname: string) =>
  pathname === ROUTES.home || pathname.startsWith(`${ROUTES.project}/`);

interface SiteLayoutProps {
  children: React.ReactNode;
}

/** Chrome shared by every public page: skip link, fixed navbar, menu drawer and footer. */
export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const navigate = useSiteNavigation();
  const menu = useDisclosure();
  const [selectedTab, setSelectedTab] = useState(DEFAULT_NAV_TAB);
  const isHome = pathname === ROUTES.home;
  const hasHero = opensWithHero(pathname);

  // Smooth scrolling lives here so it persists across page changes
  useSmoothScroll();
  useNavigationScroll();

  const routeTab = ROUTE_TABS.find(([prefix]) => pathname.startsWith(prefix))?.[1];

  const handleSelectTab = (tab: NavTab) => {
    setSelectedTab(tab.id);
    if (tab.target) navigate(sectionPath(tab.target));
    else if (!isHome) navigate(ROUTES.home);
  };

  return (
    <div className="relative w-full max-w-full overflow-x-clip bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] selection:bg-purple-500/25 selection:text-current transition-colors duration-300">
      {/* Skip navigation: first focusable element on the page */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar
        variant={hasHero ? 'dark' : 'light'}
        activeTab={isHome ? selectedTab : routeTab}
        onSelectTab={handleSelectTab}
        onOpenMenu={menu.open}
      />

      {/* Hero pages reserve their own room under the navbar; other pages start below it */}
      {!hasHero && <div aria-hidden className="h-[var(--navbar-offset)]" />}

      <main id="main-content">{children}</main>

      <Footer />
      <MenuModal isOpen={menu.isOpen} onClose={menu.close} />
    </div>
  );
};
