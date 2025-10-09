"use client";

import { useEffect, useState } from "react";

export const FoodsMenuData = () => {
  const [foods, setFoods] = useState<foodsTypeProps[]>([]);

  const getFoodMenu = async () => {
    const result = await fetch("http://localhost:4000/api/food");
    const responseData = await result.json();
    console.log({ responseData });
    const { data } = responseData;
    console.log(data);
    setFoods(data);
  };

  useEffect(() => {
    getFoodMenu();
  }, []);
};
