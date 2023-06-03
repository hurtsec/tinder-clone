const MatchDisplay = () => {
  return (
    <div className="flex flex-wrap justify-between gap-y-4 p-4">
      <div className="flex h-32 w-24 items-end rounded-md bg-red-900">
        <div className="w-full overflow-hidden bg-gradient-to-t from-black to-transparent p-2">
          <h3 className="overflow-hidden text-ellipsis text-sm font-bold">
            Jamesasdfasdf
          </h3>
        </div>
      </div>
      <div className="h-32 w-24 rounded-md bg-red-900"></div>
      <div className="h-32 w-24 rounded-md bg-red-900"></div>
      <div className="h-32 w-24 rounded-md bg-red-900"></div>
    </div>
  );
};

export default MatchDisplay;
