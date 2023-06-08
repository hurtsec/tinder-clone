import ItsAMatch from "./graphics/ItsAMatch";
import Like from "./icons/Like";
import Close from "./icons/close";

const MatchOverlay = ({
  handleDismissMatchOverlay,
}: {
  handleDismissMatchOverlay: () => void;
}) => {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-between bg-gradient-to-t from-black to-transparent py-10">
      <button
        className="absolute right-0 top-0 p-3 text-neutral-700"
        onClick={handleDismissMatchOverlay}
      >
        <Close />
      </button>
      <ItsAMatch />
      <div className="flex flex-col items-center justify-center py-3 text-green-500">
        <Like size={5} />
        <p className="font-semibold text-white">Bev likes you too!</p>
      </div>
      <div className="flex w-10/12 justify-between gap-2 border border-neutral-700 bg-neutral-900 px-2 py-3">
        <input
          type="text"
          placeholder="Say something nice!"
          className="flex-grow bg-transparent focus-visible:outline-none "
        />
        <button className="uppercase text-neutral-600">Send</button>
      </div>
      <div className="flex w-10/12 justify-between pt-4">
        <button className="rounded-2xl border border-neutral-600 bg-neutral-700 px-4 py-1">
          👋
        </button>
        <button className="rounded-2xl border border-neutral-600 bg-neutral-700 px-4 py-1">
          😉
        </button>
        <button className="rounded-2xl border border-neutral-600 bg-neutral-700 px-4 py-1">
          ❤
        </button>
        <button className="rounded-2xl border border-neutral-600 bg-neutral-700 px-4 py-1">
          😍
        </button>
      </div>
    </div>
  );
};

export default MatchOverlay;
