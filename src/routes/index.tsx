import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "~/layouts/MainLayout";
import ErrorPage from "~/pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import HomePage from "~/pages/HomePage";
import VideoPost from "~/pages/createPost/VideoPost";
import CreatePost from "~/pages/createPost/createPost";
import Settings from "~/pages/SettingPage";
import ImagePost from "../pages/createPost/ImagePost";
import TextPost from "../pages/createPost/TextPost";
import AudioPost from "../pages/createPost/AudioPost";
import Earnings from "~/pages/Earnings";
import Payouts from "~/pages/Payouts";
import EventPost from "~/pages/createPost/EventPost";
import Fans from "~/pages/MyFans";
import CreateAccount from "~/pages/CreateAccount";
import Product from "~/pages/Product";
import { CreateAccountContextProvider } from "~/pages/CreateAccount/createAccountContext";
import Partners from "~/pages/Partners";
import Invitations from "~/pages/Invitations";
import EditProductPage from "~/pages/Product/EditProduct";
import CreateProductPage from "~/pages/Product/CreateProduct";
import CreateEventPost from "~/pages/createPost/EventPost/CreateEventPost";
import EditEventPost from "~/pages/createPost/EventPost/EditEventPost";
import PartnerRegistration from "~/pages/PartnerRegistration";

// eslint-disable-next-line react-refresh/only-export-components
const ChatPage = React.lazy(() => import("~/pages/Chat/ChatWrapper"));

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
            path: "/partners",
            element: <Partners />,
          },
          {
            path: "/create",
            children: [
              {
                path: "",
                element: (
                  // <HomeLayoutWithBottomTab>
                  <CreatePost />
                  // </HomeLayoutWithBottomTab>
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
            path: "/event",
            element: <EventPost />,
          },
          {
            path: "/event/create",
            element: <CreateEventPost />,
          },
          {
            path: "/event/edit/:event_id",
            element: <EditEventPost />,
          },
          {
            path: "/product",
            element: <Product />,
          },
          {
            path: "/product/create",
            element: <CreateProductPage />,
          },
          {
            path: "/product/edit/:product_id",
            element: <EditProductPage />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "/earnings",
            element: <Earnings />,
          },
          {
            path: "/payouts",
            element: <Payouts />,
          },
          {
            path: "/fans",
            element: <Fans />,
          },
          {
            path: "/invitations",
            element: <Invitations />,
          },
          {
            path: "/chat",
            element: (
              <Suspense>
                <ChatPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/create-account",
        element: (
          <CreateAccountContextProvider>
            <CreateAccount />
          </CreateAccountContextProvider>
        ),
      },
      {
        path: "/partners-registration",
        element: <PartnerRegistration />,
      },
    ],
  },
]);

export default router;
