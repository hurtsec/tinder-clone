import type { User } from "@prisma/client";

const MatchDisplay = ({ matches }: { matches: User[] }) => {
  return (
    <div className="flex flex-wrap justify-between gap-y-4 p-4">
      {matches.map((user) => (
        <div
          key={user.id}
          className="flex h-32 w-24 items-end overflow-hidden rounded-md bg-red-900 bg-cover bg-center"
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
      ))}
    </div>
  );
};

export default MatchDisplay;
