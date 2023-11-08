import ListCard from "./ListCard";

const List = ({ places, className }) => {
  return (
    <div className={`${className}`}>
      {places.length === 0 && (
        <p className="text-xl h-full text-gray-50 text-center flex flex-col gap-2">
          <span className="font-medium text-2xl">Oops!</span> No places here :(
        </p>
      )}
      {places.map((place) => (
        <ListCard key={place.id} place={place} />
      ))}
    </div>
  );
};

export default List;
