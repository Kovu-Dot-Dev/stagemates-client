import React from 'react';
import { createBrowserRouter } from 'react-router';

import { AppLayout } from './features/AppLayout';

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: 'root' },
      { path: 'login', element: 'login' },
      { path: 'register', element: 'register' },
      {
        path: 'profiles',
        children: [
          { index: true, element: <AllProfiles /> },
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
