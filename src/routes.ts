import { createBrowserRouter } from "react-router";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: App },
      { path: "about", Component: App },
      {
        path: "auth",
        Component: App,
        children: [
          { path: "login", Component: App },
          { path: "register", Component: App },
        ],
      },
      {
        path: "concerts",
        children: [
          { index: true, Component: App },
          { path: ":city", Component: App },
          { path: "trending", Component: App },
        ],
      },
    ],
  },
]);

export default router;
