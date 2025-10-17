"use client";
import { AddDishesCategoryContainer } from "@/components/main/AddDishesCategoryContainer";
import { AdminLayout } from "../_components/AdminLayout";

import { AddNewDish } from "@/components/main/AddNewDish";
import { useEffect, useState } from "react";
import { FoodMenuCard } from "@/components/main/FoodMenuCard";

const ProductsPage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const getCategories = async () => {
    const result = await fetch("http://localhost:4000/api/categories");
    const responseData = await result.json();
    const { data } = responseData;
    setCategories(data);
  };

  const getFoods = async () => {
    const result = await fetch("http://localhost:4000/api/food");
    const responseData = await result.json();
    setFoods(responseData.data);
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  return (
    <AdminLayout>
      <AddDishesCategoryContainer />
      {categories.map((category) => {
        return (
          <div
            key={category._id}
            className="p-5 mt-6 ml-6 mr-10  bg-background flex gap-4 ">
            <AddNewDish
              key={category._id}
              refetchFoods={getFoods}
              category={category}
              foods={foods}
            />
            {foods
              .filter((food) => food.categoryId._id == category._id)
              .map((food) => {
                return (
                  <div key={food._id} className="flex flex-wrap">
                    <FoodMenuCard food={food} refetchFoods={getFoods} />
                  </div>
                );
              })}
          </div>
        );
      })}
    </AdminLayout>
  );
};

export default ProductsPage;
