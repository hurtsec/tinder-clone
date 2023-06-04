import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { User } from "@prisma/client";
import ChatContainer from "~/components/ChatContainer";
import { api } from "~/utils/api";
import UserCard from "~/components/UserCard";
import EmptyUserCard from "~/components/EmptyUserCard";

const cacheImages = async (srcArray: string[]) => {
  const promises = srcArray.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  });

  await Promise.all(promises);
};

const Dashboard = () => {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated: () => void router.replace("/"),
  });
  const { data: whoAmI } = api.users.whoAmI.useQuery();
  const { data: usersGenderInterestOverlap } =
    api.users.getByGenderInterests.useQuery();
  const [usersToDisplay, setUsersToDisplay] = useState<User[]>([]);

  useEffect(() => {
    if (!usersToDisplay.length) return;
    const userSrcs = usersToDisplay.map((user: User) => user.image || "");
    if (!userSrcs.length) return;
    void cacheImages(userSrcs);
  }, [usersToDisplay]);

  useEffect(() => {
    console.log("useEffect");
    if (usersGenderInterestOverlap?.length)
      setUsersToDisplay(usersGenderInterestOverlap);
  }, [usersGenderInterestOverlap]);

  const removeUserCard = (currentUsersDisplayed: User[], id: string) => {
    const newArr = [...currentUsersDisplayed];
    const userIndexToRemove = newArr.findIndex((user) => user.id === id);
    if (userIndexToRemove === -1) return currentUsersDisplayed;
    newArr.splice(userIndexToRemove, 1);
    return newArr;
  };

  const handleLike = (id: string) => {
    setUsersToDisplay((currentUsersDisplayed) => {
      return removeUserCard(currentUsersDisplayed, id);
    });
  };

  const handleDislike = (id: string) => {
    setUsersToDisplay((currentUsersDisplayed) => {
      return removeUserCard(currentUsersDisplayed, id);
    });
  };
  return (
    <div className="flex gap-5">
      <ChatContainer user={whoAmI} />
      <div className="flex w-8/12 flex-grow flex-col items-center justify-center p-12">
        <div>
          {usersToDisplay.length > 0 ? (
            usersToDisplay.map((user, i) => (
              <UserCard
                key={user.id}
                user={user}
                hidden={i !== 0}
                handleDislike={handleDislike}
                handleLike={handleLike}
              />
            ))
          ) : (
            <EmptyUserCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
