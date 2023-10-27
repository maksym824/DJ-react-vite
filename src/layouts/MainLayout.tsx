// import { SnackbarProvider } from "notistack";
import { Outlet, useSearchParams } from "react-router-dom";

const MainLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  if (searchParams.get("invite") != undefined) {
    window.location.assign(
      "https://auth.djfan.app/auth/signupdj?invite=" +
        searchParams.get("invite")
    );
  }
  return (
    <>
      {/* <SnackbarProvider /> */}
      <Outlet />
    </>
  );
};

export default MainLayout;
