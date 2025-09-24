import { Music } from 'lucide-react';
import React from 'react';
import { Outlet } from 'react-router';

import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';

export const NavBar: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar01
        className="mb-4"
        logo={
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-primary-foreground" />
          </div>
        }
        logoHref="/"
        navigationLinks={[
          { label: 'Home', href: '/', active: false },
          { label: 'Profiles', href: '/profiles', active: true },
          { label: 'Jams', href: '/jams', active: false },
        ]}
      />
      <Outlet />
    </div>
  );
};
