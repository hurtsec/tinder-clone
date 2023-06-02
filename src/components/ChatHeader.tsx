import { signOut } from "next-auth/react";
import type { User } from "~/common/routerOutputs/userRouter";
import Logout from "./icons/Logout";

const ChatHeader = ({ user }: { user: User | undefined }) => {
  const handleLogoutClick = () => {
    void signOut();
  };

  return (
    <div className="flex justify-between bg-gradient-to-bl from-orange-700 to-red-700 p-5">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 overflow-hidden rounded-2xl">
          <img
            className="w-full"
            src={user?.image || ""}
            alt="My profile image"
          />
        </div>
        <h3 className="font-semibold text-white">{user?.name}</h3>
      </div>
      <button
        className="rounded-full bg-black bg-opacity-75 p-3 text-white hover:text-red-500"
        onClick={handleLogoutClick}
      >
        <Logout />
      </button>
    </div>
  );
};

export default ChatHeader;
