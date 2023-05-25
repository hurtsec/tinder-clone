import ChatDisplay from "./ChatDisplay";
import ChatHeader from "./ChatHeader";
import MatchDisplay from "./MatchDisplay";

const ChatContainer = () => {
  return (
    <div
      className="z-10 h-screen w-1/3 max-w-sm"
      style={{
        boxShadow: "rgba(0,0,0,0.05) 0px 6px 24px 0px",
      }}
    >
      <ChatHeader />
      <div>
        <button className="border-b-4 border-b-red-700 bg-white p-2 text-lg font-semibold disabled:border-b-neutral-500">
          Matches
        </button>
        <button className="border-b-4 border-b-red-700 bg-white p-2 text-lg font-semibold disabled:border-b-neutral-500">
          Chat
        </button>
      </div>
      <MatchDisplay />
      <ChatDisplay />
    </div>
  );
};

export default ChatContainer;
