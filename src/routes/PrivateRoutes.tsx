import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import ExternalNavigate from "./ExternalNavigate";
import { useUserAccount } from "~/services/settings/userAccount";
import ProfileReviewPage from "~/pages/ProfileReviewPage";
import { CreateAccountContextProvider } from "~/pages/CreateAccount/createAccountContext";
import CreateAccount from "~/pages/CreateAccount";

interface PrivateRoutesProps {}

// /create-account

const PrivateRoutes: FunctionComponent<PrivateRoutesProps> = () => {
  const { data: user, isLoading } = useUserAccount();

  if (isLoading) return <></>;
  if (!user)
    return <ExternalNavigate to={import.meta.env.VITE_DJFAN_SIGN_IN_URL} />;
  if (user?.profile_active == 0) {
    if (user?.profile_done == 1) {
      return <ProfileReviewPage />;
    } else {
      return (
        <CreateAccountContextProvider>
          <CreateAccount />
        </CreateAccountContextProvider>
      );
    }
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;
