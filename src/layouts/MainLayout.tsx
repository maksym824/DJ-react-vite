// import { SnackbarProvider } from "notistack";
import { Outlet, useSearchParams } from "react-router-dom";

const MainLayout = () => {
  const [searchParams] = useSearchParams();
  if (searchParams.get("invite") != undefined) {
    window.location.assign(
      import.meta.env.VITE_DJFAN_SIGN_UP_URL +
        "?invite=" +
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
