import { useState } from "react";
import ChatDisplay from "./ChatDisplay";
import ChatHeader from "./ChatHeader";
import MatchDisplay from "./MatchDisplay";
import type { User } from "~/common/routerOutputs/userRouter";

type Props = {
  user: User;
  matches?: User[];
  activeMatch?: string;
};

const ChatContainer = ({ user, matches, activeMatch }: Props) => {
  const [messagesActiveTab, setMessagesActiveTab] = useState(false);

  const handleMatchesClick = () => setMessagesActiveTab(false);
  const handleMessagesClick = () => setMessagesActiveTab(true);
  return (
    <div className="z-10 flex h-screen w-1/3 max-w-sm flex-col border-r border-neutral-700 bg-neutral-900">
      <div>
        <ChatHeader user={user} />
        <div className="flex gap-4 px-4 py-3">
          <button
            onClick={handleMatchesClick}
            className={`text-md ${
              !messagesActiveTab ? "border-b-red-700" : "border-b-transparent"
            } border-b-4 bg-transparent px-2 font-semibold text-neutral-200`}
          >
            Matches
          </button>
          <button
            onClick={handleMessagesClick}
            className={`text-md ${
              messagesActiveTab ? "border-b-red-700" : "border-b-transparent"
            } border-b-4 bg-transparent px-2 font-semibold text-neutral-200`}
          >
            Messages
          </button>
        </div>
        {matches && (
          <MatchDisplay matches={matches} activeMatch={activeMatch} />
        )}
      </div>
      {messagesActiveTab && <ChatDisplay />}
    </div>
  );
};

export default ChatContainer;
