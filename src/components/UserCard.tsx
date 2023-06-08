import type { User } from "@prisma/client";
import Dislike from "./icons/Dislike";
import Like from "./icons/Like";
import MatchOverlay from "./MatchOverlay";

type Props = {
  user: User;
  hidden: boolean;
  handleDislike: (id: string) => void;
  handleLike: (id: string) => void;
};

const UserCard = ({ user, hidden, handleDislike, handleLike }: Props) => {
  return (
    <div
      className={`relative flex flex-col justify-end overflow-hidden rounded-2xl bg-cover bg-center shadow-center-lg shadow-neutral-400 ${
        hidden ? "hidden" : ""
      }`}
      style={{
        backgroundImage: `url(${user.image || ""})`,
        width: "400px",
        height: "650px",
      }}
    >
      <div className="bg-gradient-to-b from-transparent to-black p-4">
        <h3 className="text-3xl font-bold text-white">
          {user.name}
          &nbsp;
          <span className="text-2xl font-normal">72</span>
        </h3>
      </div>
      <div className="flex justify-between bg-black px-10 py-3">
        <button
          className="rounded-full border border-red-500 bg-transparent p-3 text-red-500"
          onClick={() => handleDislike(user.id)}
        >
          <Dislike />
        </button>
        <button
          className="rounded-full border border-green-500 bg-transparent p-3 text-green-500"
          onClick={() => handleLike(user.id)}
        >
          <Like />
        </button>
      </div>
      <MatchOverlay />
    </div>
  );
};

export default UserCard;
