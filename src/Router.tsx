import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Tv from "./pages/Tv";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Navigate to="movie" />,
      },
      {
        path: "movie",
        element: <Home />,
        children: [
          {
            path: ":id",
            element: <Home />,
          },
        ],
      },
      {
        path: "tv",
        element: <Tv />,
        children: [
          {
            path: ":id",
            element: <Tv />,
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
        children: [
          {
            path: ":section/:id",
            element: <Search />,
          },
        ],
      },
      {
        path: "mylist",
        element: <MyList />,
        children: [
          {
            path: ":section/:id",
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
