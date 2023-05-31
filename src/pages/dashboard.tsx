import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ChatContainer from "~/components/ChatContainer";
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
      <div className="flex w-8/12 flex-grow flex-col items-center p-12">
        <div
          className="flex flex-col justify-end overflow-hidden rounded-2xl bg-white bg-cover bg-center shadow-2xl shadow-black"
          style={{
            backgroundImage: usersGenderInterestOverlap
              ? `url(${usersGenderInterestOverlap[0]?.image || ""})`
              : "",
            width: "400px",
            height: "650px",
          }}
        >
          <div className="bg-white p-4">
            <h3 className="font-semibold">
              {usersGenderInterestOverlap
                ? usersGenderInterestOverlap[0]?.name
                : ""}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
