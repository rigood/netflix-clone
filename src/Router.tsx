import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./Root";
import Browse from "./pages/Browse";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    element: <Root />,
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
]);

export default router;
