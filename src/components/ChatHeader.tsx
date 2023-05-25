const ChatHeader = () => {
  return (
    <div className="flex justify-between bg-gradient-to-bl from-orange-700 to-red-700 p-8">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 overflow-hidden rounded-2xl">
          <img className="w-full" src="" />
        </div>
        <h3 className="font-semibold text-white">Username</h3>
      </div>
      <i className="font-extrabold text-white">⇦</i>
    </div>
  );
};

export default ChatHeader;
