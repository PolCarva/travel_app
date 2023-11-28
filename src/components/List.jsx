import ListCard from "./ListCard";

const List = ({ places, className, isLoading }) => {
  return (
    <div className={`${className}`}>
      {isLoading && (
        <p className="text-xl h-full text-gray-50 text-center flex flex-col gap-2">
          <span className="font-medium text-2xl">Loading...</span>
        </p>
      )}
      {!isLoading && places?.length === 0 && (
        <p className="text-xl h-full text-gray-50 text-center flex flex-col gap-2">
          <span className="font-medium text-2xl">Oops!</span> No places here :(
        </p>
      )}
      {places?.length > 0 && !isLoading && (
        <p className="text-xl text-gray-50 text-center flex flex-col gap-2">
          Places ({places?.length})
        </p>
      )}
      {places?.map((place) => (
        <ListCard key={place.id} place={place} />
      ))}
    </div>
  );
};

export default List;
