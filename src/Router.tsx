import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Browse from "./pages/Browse";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate to="browse/movie" />,
        },
        {
          path: "browse/:section",
          element: <Browse />,
        },
        {
          path: "search/:section",
          element: <Search />,
        },
        {
          path: "mylist",
          element: <MyList />,
          children: [
            {
              path: ":section",
              element: <MyList />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

export default router;
