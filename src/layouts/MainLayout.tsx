// import { SnackbarProvider } from "notistack";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  return (
    <>
      {/* <SnackbarProvider /> */}
      <Outlet />
    </>
  );
};

export default MainLayout;
