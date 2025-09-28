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
    <div
      className="min-h-screen"
      style={{
        // background: 'linear-gradient(135deg, #f5f7fa 0%, #ace0f9 100%)',
        // backgroundImage: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        // backgroundImage: 'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)',
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        // backgroundImage: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',
      }}>
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
