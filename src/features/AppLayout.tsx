import { Music } from 'lucide-react';
import React from 'react';
import { Outlet, useLocation } from 'react-router';

import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';

export const AppLayout: React.FC = () => {
  const { pathname: currentPath } = useLocation();
  console.log('Current path:', currentPath);
  const navigationLinks = [
    { label: 'Jammers', href: '/profiles', active: currentPath.startsWith('/profiles') },
    { label: 'Jams', href: '/jams', active: currentPath.startsWith('/jams') },
  ];
  return (
    <div className="min-h-screen bg-background">
      <Navbar01
        brandName="Jammy"
        logo={
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-primary-foreground" />
          </div>
        }
        logoHref="/"
        navigationLinks={navigationLinks}
      />
      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};
