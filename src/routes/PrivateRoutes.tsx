import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import ExternalNavigate from "./ExternalNavigate";
import { useUserAccount } from "~/services/settings/userAccount";

interface PrivateRoutesProps {}

const PrivateRoutes: FunctionComponent<PrivateRoutesProps> = () => {
  const { data: user } = useUserAccount();
  if (!user)
    return <ExternalNavigate to={import.meta.env.VITE_DJFAN_SIGN_IN_URL} />;
  else return <Outlet />;
};

export default PrivateRoutes;
