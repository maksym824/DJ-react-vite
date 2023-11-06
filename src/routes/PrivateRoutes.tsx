import { FunctionComponent, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ExternalNavigate from "./ExternalNavigate";
import { useUserAccount } from "~/services/settings/userAccount";
import ProfileReviewPage from "~/pages/ProfileReviewPage";
import { CreateAccountContextProvider } from "~/pages/CreateAccount/createAccountContext";
import CreateAccount from "~/pages/CreateAccount";
import { useChatContext } from "stream-chat-react";
import { User } from "stream-chat";
import useUserChatToken from "~/services/getChatStreamToken";

interface PrivateRoutesProps {}

const PrivateRoutes: FunctionComponent<PrivateRoutesProps> = () => {
  const { data: user, isLoading } = useUserAccount();
  const { client } = useChatContext();
  const { data: userChatToken } = useUserChatToken();
  const isDj = user?.dj || false;

  useEffect(() => {
    if (client && user?.user_id && userChatToken && !client.user) {
      const userStreamChat: User = {
        id: user?.user_id?.toString() as string,
        name: user?.username as string,
        image: user?.profile_url as string,
      };
      client.connectUser(userStreamChat, userChatToken);
    }
  }, [client, user, userChatToken]);

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
