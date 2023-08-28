import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import HomePage from "../pages/HomePage";

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
        ],
      },
    ],
  },
]);

export default router;
