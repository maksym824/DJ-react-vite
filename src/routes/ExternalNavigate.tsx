import { FunctionComponent } from "react";
import AuthLayout from "../layouts/AuthLayout";

interface ExternalNavigateProps {
  to: string;
}

const ExternalNavigate: FunctionComponent<ExternalNavigateProps> = ({ to }) => {
  // window.location.replace(to);
  console.log(to);
  return <AuthLayout />;
};

export default ExternalNavigate;
