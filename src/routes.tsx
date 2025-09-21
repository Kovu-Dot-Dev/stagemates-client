import { createBrowserRouter } from "react-router";
import React from "react";
import App from "./App.tsx";

const Profile = React.lazy(() => import("./features/profile"));

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <App /> },
      { path: "about", element: <App /> },
      {
        path: "auth",
        element: <App />,
        children: [
          { path: "login", element: <App /> },
          { path: "register", element: <App /> },
        ],
      },
      {
        path: "profiles",
        children: [
          { path: ":id", element: <Profile /> },
        ],
      },
    ],
  },
]);

export default router;
