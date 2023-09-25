import { FunctionComponent } from "react";
import LandingPage from "~/pages/LandingPage";

interface ExternalNavigateProps {
  to: string;
}

const ExternalNavigate: FunctionComponent<ExternalNavigateProps> = ({ to }) => {
  // window.location.replace(to);
  console.log(to);
  return <LandingPage />;
};

export default ExternalNavigate;
