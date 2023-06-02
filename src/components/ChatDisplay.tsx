import Chat from "./Chat";
import ChatInput from "./ChatInput";

const ChatDisplay = () => {
  return (
    <div className="flex flex-grow flex-col">
      <Chat />
      <ChatInput />
    </div>
  );
};

export default ChatDisplay;
