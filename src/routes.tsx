import { createBrowserRouter } from 'react-router';
import React from 'react';

const Profile = React.lazy(() => import('@/features/profile'));
const JamDetails = React.lazy(() =>
  import('@/features/jams').then((mod) => ({ default: mod.JamDetails }))
);
const JamDiscovery = React.lazy(() =>
  import('@/features/jams').then((mod) => ({ default: mod.JamDiscovery }))
);

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: 'root' },
      { path: 'login', element: 'login' },
      { path: 'register', element: 'register' },
      {
        path: 'profiles',
        children: [{ path: ':id', element: <Profile /> }],
      },
      {
        path: 'events',
        children: [
          { index: true, element: <JamDiscovery /> },
          { path: ':id', element: <JamDetails /> },
        ],
      },
    ],
  },
]);

export default router;
