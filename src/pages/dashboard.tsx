import ChatContainer from "~/components/ChatContainer";

const Dashboard = () => {
  return (
    <div className="flex justify-between">
      <ChatContainer />
      <div className="flex w-8/12 flex-col items-center">
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
