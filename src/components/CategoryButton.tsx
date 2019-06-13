import React from "react";

const CategoryButton: React.FC<{ categoryName: string }> = ({
  categoryName
}) => {
  return <button className={"CategoryButton"}>{categoryName}</button>;
};

export default CategoryButton;
