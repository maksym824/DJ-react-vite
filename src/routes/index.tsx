import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import HomePage from "../pages/HomePage";
import VideoPost from "../pages/createPost/VideoPost";
import HomeLayoutWithBottomTab from "../layouts/HomeLayoutWithBottomTab";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PrivateRoutes />,
        path: "",
        children: [
          {
            path: "/",
            element: (
              <HomeLayoutWithBottomTab>
                <HomePage />
              </HomeLayoutWithBottomTab>
            ),
          },
          {
            path: "/create",
            children: [
              {
                path: "/create/video",
                element: <VideoPost />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
