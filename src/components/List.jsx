import ListCard from "./ListCard";

const List = ({ data, className }) => {
  return (
    <div className={`${className}`}>
      {data.map((item, index) => (
        <ListCard key={index} data={item} />
      ))}
    </div>
  );
};

export default List;
