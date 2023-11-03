import ListCard from "./ListCard";

const List = ({ places, className }) => {
  return (
    <div className={`${className}`}>
      {places.map((place) => (
        <ListCard key={place.id} place={place} />
      ))}
    </div>
  );
};

export default List;
