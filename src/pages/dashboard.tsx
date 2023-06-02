import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ChatContainer from "~/components/ChatContainer";
import Dislike from "~/components/icons/Dislike";
import Like from "~/components/icons/Like";
import { api } from "~/utils/api";

const Dashboard = ({ currentUser }: { currentUser: User }) => {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated: () => void router.replace("/"),
  });
  const { data: whoAmI } = api.users.whoAmI.useQuery();
  const { data: usersGenderInterestOverlap } =
    api.users.getByGenderInterests.useQuery();
  return (
    <div className="flex gap-5">
      <ChatContainer user={whoAmI} />
      <div className="flex w-8/12 flex-grow flex-col items-center justify-center p-12">
        <div>
          <div
            className="flex flex-col justify-end overflow-hidden rounded-2xl bg-white bg-cover bg-center shadow-center-lg shadow-neutral-400"
            style={{
              backgroundImage: usersGenderInterestOverlap
                ? `url(${usersGenderInterestOverlap[0]?.image || ""})`
                : "",
              width: "400px",
              height: "650px",
            }}
          >
            <div className="bg-gradient-to-b from-transparent to-black p-4">
              <h3 className="text-3xl font-bold text-white">
                {usersGenderInterestOverlap
                  ? usersGenderInterestOverlap[0]?.name
                  : ""}
                &nbsp;
                <span className="text-2xl font-normal">72</span>
              </h3>
            </div>
            <div className="flex justify-between bg-black px-10 py-3">
              <button className="rounded-full border border-red-500 bg-transparent p-3 text-red-500">
                <Dislike />
              </button>
              <button className="rounded-full border border-green-500 bg-transparent p-3 text-green-500">
                <Like />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
