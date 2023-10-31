import { Flex, Heading, Stack } from "@chakra-ui/react";
import { useInvitee } from "~/services/invitations";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "~/components/Loader";
import ConnectionTable from "./ConnectionTable";
import { Invitee } from "~/types";
import { useEffect } from "react";

export default function ConnectedAccounts() {
  const pageSize = 10;
  const { data, fetchNextPage, hasNextPage, isLoading } = useInvitee({
    pageSize,
  });

  useEffect(() => {
    const infiniteScrollWrapper = document.querySelector(
      ".infinite-scroll-component__outerdiv"
    );
    if (infiniteScrollWrapper) {
      (infiniteScrollWrapper as HTMLElement).style.width = "100%";
    }
  }, []);

  return (
    <Stack gap="15px">
      <Heading fontSize="24px" alignSelf="flex-start">
        Connected Accounts
      </Heading>
      <Flex
        bg="#ffffff"
        borderRadius="10px"
        overflow="hidden"
        border="1px solid #111111"
      >
        <InfiniteScroll
          dataLength={(data?.pages.length ?? 0) * pageSize}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={<Loader />}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <ConnectionTable>
              {data?.pages.map((page) =>
                page.map((invitee: Invitee) => (
                  <ConnectionTable.Row
                    key={invitee.display_name}
                    invitee={invitee}
                  />
                ))
              )}
            </ConnectionTable>
          )}
        </InfiniteScroll>
      </Flex>
    </Stack>
  );
}
