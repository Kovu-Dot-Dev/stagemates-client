import { createBrowserRouter } from 'react-router';
import React from 'react';

const Profile = React.lazy(() => import('./features/profile'));

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
    ],
  },
]);

export default router;
