// import { SnackbarProvider } from "notistack";
import Header from "../components/Header";
import BottomTab from "../components/BottomTab";

type Props = {
  children: React.ReactNode;
};

const HomeLayoutWithBottomTab = ({ children }: Props) => {
  return (
    <>
      {/* <SnackbarProvider /> */}
      <Header />
      <div
        style={{
          height: "calc(100vh - 64px - 53px)",
        }}
      >
        {children}
      </div>
      <BottomTab />
    </>
  );
};

export default HomeLayoutWithBottomTab;
