import type { User } from "@prisma/client";
import Link from "next/link";

type Props = {
  matches: User[];
  activeMatch?: string;
};

const MatchDisplay = ({ matches, activeMatch }: Props) => {
  return (
    <div className="flex flex-wrap gap-x-7 gap-y-4 p-4">
      {matches.map((user) => (
        <Link href={`/messages/${user.id}`} key={user.id}>
          <div
            className={`flex h-32 w-24 cursor-pointer items-end overflow-hidden rounded-md bg-red-900 bg-cover bg-center ${
              activeMatch && activeMatch !== user.id ? "opacity-40" : ""
            }`}
            style={{
              backgroundImage: `url(${user.image || ""})`,
            }}
          >
            <div className="w-full overflow-hidden bg-gradient-to-t from-black to-transparent p-2">
              <h3 className="overflow-hidden text-ellipsis text-sm font-bold">
                {user.name}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MatchDisplay;
