import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ChatContainer from "~/components/ChatContainer";
import { api } from "~/utils/api";

const Dashboard = () => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => void router.replace("/"),
  });
  const { data: currentUser } = api.users.whoAmI.useQuery();
  return (
    <div className="flex gap-5">
      <ChatContainer user={currentUser} />
      <div className="flex w-8/12 flex-grow flex-col items-center p-12">
        <div
          className="flex flex-col justify-end overflow-hidden rounded-2xl bg-white bg-cover bg-center shadow-2xl shadow-black"
          style={{
            backgroundImage: `url(https://i.imgur.com/Q9WPlWA.jpeg)`,
            width: "400px",
            height: "650px",
          }}
        >
          <div className="bg-white p-4">
            <h3 className="font-semibold">Richard Heathclif</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
