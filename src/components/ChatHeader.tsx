import { signOut } from "next-auth/react";
import type { User } from "~/common/routerOutputs/userRouter";

const ChatHeader = ({ user }: { user: User | undefined }) => {
  const handleLogoutClick = () => {
    void signOut();
  };

  return (
    <div className="flex justify-between bg-gradient-to-bl from-orange-700 to-red-700 p-8">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 overflow-hidden rounded-2xl">
          <img
            className="w-full"
            src={user?.image || ""}
            alt="My profile image"
          />
        </div>
        <h3 className="font-semibold text-white">Username</h3>
      </div>
      <i
        className="cursor-pointer font-extrabold text-white"
        onClick={handleLogoutClick}
      >
        ⇦
      </i>
    </div>
  );
};

export default ChatHeader;
