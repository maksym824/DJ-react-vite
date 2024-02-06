import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import ExternalNavigate from "./ExternalNavigate";
import { useUserAccount } from "~/services/settings/userAccount";
import ProfileReviewPage from "~/pages/ProfileReviewPage";
import { CreateAccountContextProvider } from "~/pages/CreateAccount/createAccountContext";
import CreateAccount from "~/pages/CreateAccount";
import { useCookies } from "react-cookie";

interface PrivateRoutesProps {}

const PrivateRoutes: FunctionComponent<PrivateRoutesProps> = () => {
  const { data: user, isLoading } = useUserAccount();
  const [cookies, setCookie, removeCookie] = useCookies([
    "user_id",
    "user_type",
    "signup",
  ]);
  const isDj = user?.dj || false;

  if (isLoading) {
    return <></>;
  }

  if (!user) {
    return <ExternalNavigate to={import.meta.env.VITE_DJFAN_SIGN_IN_URL} />;
  }

  if (cookies.signup) {
    let userType = (
      user?.partner ? "partner" : "" + " " + user?.dj ? "dj" : ""
    ).trim();

    setCookie("user_id", user?.user_key, { path: "/", domain: ".djfan.app" });
    setCookie("user_type", userType, {
      path: "/",
      domain: ".djfan.app",
    });
    removeCookie("signup", { path: "/", domain: ".djfan.app" });
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "sign_up",
        user_id: user?.user_key,
        user_type: userType,
      });
    }
  }

  if (isDj == true && !user?.profile_active) {
    if (!user?.profile_done) {
      return (
        <CreateAccountContextProvider>
          <CreateAccount />
        </CreateAccountContextProvider>
      );
    } else {
      return <ProfileReviewPage />;
    }
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;
