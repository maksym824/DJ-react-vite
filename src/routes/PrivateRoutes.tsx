import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import ExternalNavigate from "./ExternalNavigate";
import { useUserAccount } from "~/services/settings/userAccount";
import ProfileReviewPage from "~/pages/ProfileReviewPage";
import { CreateAccountContextProvider } from "~/pages/CreateAccount/createAccountContext";
import CreateAccount from "~/pages/CreateAccount";

interface PrivateRoutesProps {}

const PrivateRoutes: FunctionComponent<PrivateRoutesProps> = () => {
  const { data: user, isLoading } = useUserAccount();
  const isDj = user?.dj || false;

  if (isLoading) return <></>;
  if (!user)
    return <ExternalNavigate to={import.meta.env.VITE_DJFAN_SIGN_IN_URL} />;
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
