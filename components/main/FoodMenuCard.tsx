import React from "react";

type FoodMenuCardProps = {
  image: string;
  id: number;
  price: number;
  ingredients: string;
};
const FoodMenuCard = ({ image, id, price, ingredients }: FoodMenuCardProps) => {
  return (
    <div className="w-67.5 rounded-3xl border-1 bg-white p-4" key={id}>
      <img src={image} alt=""></img>
      <p>{price}</p>
      <p>{ingredients}</p>
    </div>
  );
};

export default FoodMenuCard;
