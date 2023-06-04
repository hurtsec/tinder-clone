import Dislike from "./icons/Dislike";
import Like from "./icons/Like";

const EmptyUserCard = () => {
  return (
    <div
      className="flex flex-col justify-end overflow-hidden rounded-2xl bg-neutral-900 shadow-center-lg shadow-neutral-400"
      style={{
        width: "400px",
        height: "650px",
      }}
    >
      <div className="flex flex-grow items-center justify-center bg-gradient-to-b from-transparent to-black px-8 py-4">
        <h3 className="text-center text-3xl font-bold text-white">
          That&apos;s it for now, check back later!
        </h3>
      </div>
      <div className="flex justify-between bg-black px-10 py-3">
        <button className="rounded-full border border-neutral-700 bg-transparent p-3 text-neutral-700">
          <Dislike />
        </button>
        <button className="rounded-full border border-neutral-700 bg-transparent p-3 text-neutral-700">
          <Like />
        </button>
      </div>
    </div>
  );
};

export default EmptyUserCard;
