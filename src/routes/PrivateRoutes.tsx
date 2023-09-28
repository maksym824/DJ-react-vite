import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import ExternalNavigate from "./ExternalNavigate";
import { useUserAccount } from "~/services/settings/userAccount";
import ProfileReviewPage from "~/pages/ProfileReviewPage";

interface PrivateRoutesProps {}

const PrivateRoutes: FunctionComponent<PrivateRoutesProps> = () => {
  const { data: user } = useUserAccount();
  if (!user)
    return <ExternalNavigate to={import.meta.env.VITE_DJFAN_SIGN_IN_URL} />;
  if (!user?.profile_active) return <ProfileReviewPage />;
  else return <Outlet />;
};

export default PrivateRoutes;
