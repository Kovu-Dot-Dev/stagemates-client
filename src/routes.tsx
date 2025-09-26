import React from 'react';
import { createBrowserRouter } from 'react-router';

import { AppLayout } from './features/AppLayout';
import { DiscoveryFeed } from './features/discover/DiscoveryFeed';

const Profile = React.lazy(() =>
  import('./features/profile').then((module) => ({ default: module.Profile }))
);
const AllProfiles = React.lazy(() =>
  import('@/features/profile').then((module) => ({ default: module.AllProfiles }))
);
const JamDetails = React.lazy(() =>
  import('@/features/jams').then((mod) => ({ default: mod.JamDetails }))
);
const JamDiscovery = React.lazy(() =>
  import('@/features/jams').then((mod) => ({ default: mod.JamDiscovery }))
);
const ProfileSetup = React.lazy(() =>
  import('@/features/profile').then((module) => ({ default: module.ProfileSetup }))
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DiscoveryFeed /> },
      { path: 'login', element: 'login' },
      { path: 'register', element: 'register' },
      {
        path: 'profiles',
        children: [
          { index: true, element: <AllProfiles /> },
          { path: 'setup', element: <ProfileSetup /> },
          { path: ':id', element: <Profile /> },
        ],
      },
      {
        path: 'jams',
        children: [
          { index: true, element: <JamDiscovery /> },
          { path: ':id', element: <JamDetails /> },
        ],
      },
    ],
  },
]);

export default router;
