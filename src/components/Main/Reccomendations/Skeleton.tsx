function Skeleton() {
  return (
    <div
      className={`inline-grid grid-cols-1 gap-x-4 mx-auto lg:grid-cols-2 w-full px-0 pt-0 gap-3 h-full`}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i + '-skeleton'}
          className="inline-flex rounded-lg gap-2 h-full bg-(--grey-100) shadow-2xl animate-pulse"
        >
          <div className="rounded-tl-lg rounded-bl-lg w-15 bg-(--light-grey-300)" />
          <span className="p-1 inline-flex flex-col">
            <span className="bg-(--light-grey-300) w-30 h-3.5 my-2 animate-pulse"></span>
            <span className="bg-(--light-grey-300) w-6 h-3.5 mb-2 animate-pulse"></span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
