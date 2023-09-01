// import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      {/* <SnackbarProvider /> */}
      <Outlet />
    </>
  );
};

export default MainLayout;
