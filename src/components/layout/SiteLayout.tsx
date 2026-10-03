import React, { useState } from 'react';
import { MenuModal } from '@/components/modals/MenuModal';
import { ROUTES, sectionPath } from '@/constants/routes';
import { DEFAULT_NAV_TAB } from '@/data/navigation';
import { useDisclosure } from '@/hooks/useDisclosure';
import { navigate, type Route } from '@/lib/router';
import type { NavTab } from '@/types/content';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

/** Navbar tab highlighted on pages other than home. Legal pages highlight none. */
const ROUTE_TABS: Partial<Record<Route['name'], string>> = {
  project: 'Project',
};

interface SiteLayoutProps {
  route: Route;
  children: React.ReactNode;
}

/** Chrome shared by every page: fixed navbar, menu drawer and footer. */
export const SiteLayout: React.FC<SiteLayoutProps> = ({ route, children }) => {
  const menu = useDisclosure();
  const [selectedTab, setSelectedTab] = useState(DEFAULT_NAV_TAB);
  const isHome = route.name === 'home';

  const handleSelectTab = (tab: NavTab) => {
    setSelectedTab(tab.id);
    if (tab.target) navigate(sectionPath(tab.target));
    else if (!isHome) navigate(ROUTES.home);
  };

  return (
    <div className="relative w-full max-w-full overflow-x-clip bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)] selection:bg-purple-500/25 selection:text-current transition-colors duration-300">
      <Navbar
        variant={isHome ? 'dark' : 'light'}
        activeTab={isHome ? selectedTab : ROUTE_TABS[route.name]}
        onSelectTab={handleSelectTab}
        onOpenMenu={menu.open}
      />

      {/* The landing hero reserves its own room under the navbar; other pages start below it */}
      {!isHome && <div aria-hidden className="h-[var(--navbar-offset)]" />}

      {children}

      <Footer />
      <MenuModal isOpen={menu.isOpen} onClose={menu.close} />
    </div>
  );
};
