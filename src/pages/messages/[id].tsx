import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ChatContainer from "~/components/ChatContainer";
import { api } from "~/utils/api";

const Messages = () => {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated: () => void router.replace("/"),
  });
  const { data: whoAmI } = api.users.whoAmI.useQuery();
  const { data: matches } = api.match.getMatches.useQuery();
  return (
    <div>
      {whoAmI && matches && (
        <ChatContainer
          user={whoAmI}
          matches={matches}
          activeMatch={router.query.id}
        />
      )}
    </div>
  );
};

export default Messages;
