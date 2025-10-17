import React, { useEffect, useState } from "react";
import FoodMenuCard from "./FoodMenuCard";
type FoodMenuCardProps = {
  image: string;
  _id: string;
  price: number;
  ingredients: string;
  categoryId: CategoryType;
  name: string;
};

type FoodMenuCardContainerProps = {
  foods: FoodMenuCardProps[];
};
export const FoodMenuCardContainer = ({
  foods,
}: FoodMenuCardContainerProps) => {
  const [foodMenu, setFoodMenu] = useState<FoodMenuCardProps[]>([]);

  const getFoods = async () => {
    const result = await fetch("http://localhost:4000/api/food");
    const responseData = await result.json();
    console.log({ responseData }, "Foods responseData");
    const { data } = responseData;
    console.log(data, "FOODS");
    setFoodMenu(data);
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div className="flex flex-wrap items-stretch gap-4 w-full">
      {foods.map((food) => (
        <div key={food._id} className="self-stretch">
          <FoodMenuCard
            food={food}
          />
        </div>
      ))}
    </div>
  );
};
