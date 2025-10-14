"use client";

import React, { useEffect, useState } from "react";

import { EditDishesDialog } from "./EditDishesDialog";

type FoodMenuCardProps = {
  image: string;
  _id: number;
  price: number;
  ingredients: string;
  category: string;
  name: string;
};
const FoodMenuCard = ({
  image,
  _id,
  price,
  ingredients,
  name,
  category,
}: FoodMenuCardProps) => {
  return (
    <div className="w-67.5 rounded-3xl border-1 bg-white p-4 ">
      <div>
        <img src={image} alt="" className="w-full h-full rounded-xl p-5" />
        <div>
          <EditDishesDialog />
        </div>
        <p className="text-red-500 leading-5 font-medium text-sm">{name}</p>
        <p>{price}$</p>
        <p>{ingredients}</p>
      </div>
    </div>
  );
};

export default FoodMenuCard;
