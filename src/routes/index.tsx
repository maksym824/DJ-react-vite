import { createBrowserRouter } from "react-router-dom";
import MainLayout from "~/layouts/MainLayout";
import ErrorPage from "~/pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import HomePage from "~/pages/HomePage";
import VideoPost from "~/pages/createPost/VideoPost";
import HomeLayoutWithBottomTab from "~/layouts/HomeLayoutWithBottomTab";
import CreatePost from "~/pages/createPost/createPost";
import Settings from "~/pages/SettingPage";
import ImagePost from "../pages/createPost/ImagePost";
import TextPost from "../pages/createPost/TextPost";
import AudioPost from "../pages/createPost/AudioPost";

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
            element: <HomePage />,
          },
          {
            path: "/create",
            children: [
              {
                path: "",
                element: (
                  <HomeLayoutWithBottomTab>
                    <CreatePost />
                  </HomeLayoutWithBottomTab>
                ),
              },
              {
                path: "/create/video",
                element: <VideoPost />,
              },
              {
                path: "/create/image",
                element: <ImagePost />,
              },
              {
                path: "/create/audio",
                element: <AudioPost />,
              },
              {
                path: "/create/text",
                element: <TextPost />,
              },
            ],
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

export default router;
