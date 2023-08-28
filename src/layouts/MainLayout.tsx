// import { SnackbarProvider } from "notistack";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BottomTab from "../components/BottomTab";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  return (
    <>
      {/* <SnackbarProvider /> */}
      <Header />
      <div
        style={{
          height: "calc(100vh - 64px - 53px)",
        }}
      >
        <Outlet />
      </div>
      <BottomTab />
    </>
  );
};

export default MainLayout;
