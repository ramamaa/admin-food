"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Pen, Trash } from "lucide-react";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Sumana } from "next/font/google";
export type CategoryType = {
  name: string;
  _id: string;
};
export const EditDishesDialog = () => {
  const [image, setImage] = useState<File | undefined>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategories = async () => {
    const response = await fetch("http://localhost:4000/api/categories");
    const data = await response.json();
    setCategories(data.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const addFoodHandler = async () => {
    if (!name || !price || !image || !ingredients || !selectedCategory) {
      alert("All fields are required");
      return;
    }

    const form = new FormData();

    form.append("name", name);
    form.append("price", String(price));
    form.append("image", image); // File object
    form.append("ingredients", ingredients);
    form.append("categoryId", selectedCategory);

    try {
      const response = await fetch("http://localhost:4000/api/food", {
        method: "PATCH",
        body: form,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Food created successfully!");
        setName("");
        setPrice(0);
        setImage(undefined);
        setIngredients("");
        setSelectedCategory(null);
      } else {
        alert(data.error || "Failed to create food");
      }
    } catch (error) {
      alert("Failed to create food");
    }
  };
  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  const ingredientsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };

  const deleteFoodHandler = async (id: string) => {
    await fetch("http://localhost:4000/api/food", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    await getCategories();
  };
  console.log(addFoodHandler, "add food handler");

  return (
    <div>
      <Dialog>
        <DialogTrigger className="rounded-full border-1 w-11 h-11 flex justify-center items-center">
          <Pen className="w-4 h-4" color="red" />
        </DialogTrigger>
        <DialogContent className="max-w-[472px] p-6 ">
          <DialogHeader>
            <DialogTitle>Dishes info</DialogTitle>
          </DialogHeader>
          <div className="flex gap-4 justify-between">
            <Label htmlFor="price">Dish name</Label>
            <Input
              id="price"
              name="price"
              type="string"
              className="w-[288px]"
              onChange={nameChangeHandler}
            />
          </div>
          <div className="flex gap-4 justify-between">
            <Label htmlFor="price">Dish category</Label>
            <div className="grid gap-3">
              {categories.length > 0 && (
                <Select onValueChange={(value) => setSelectedCategory(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => {
                      return (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          <div className="flex gap-4 justify-between">
            <Label htmlFor="price">Ingredients</Label>
            <Input
              id="ingredients"
              name="ingredients"
              type="string"
              className="w-[288px]"
              onChange={ingredientsChangeHandler}
            />
          </div>
          <div className="flex gap-4 justify-between">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              className="w-[288px]"
              onChange={priceChangeHandler}
            />
          </div>
          <div className="flex gap-4 justify-between h-36">
            <Label htmlFor="price">Image</Label>
            <Input
              id="price"
              name="price"
              type="file"
              className="w-[288px] h-full"
              onChange={fileChangeHandler}
            />
          </div>

          <div className="flex sm:justify-between justify-between">
            <Button
              type="submit"
              className="bg-white border-red-500 border-1 py-2 px-4"
              variant="outline"
              onClick={() => deleteFoodHandler}>
              <Trash color="red" />
            </Button>

            <Button onClick={() => addFoodHandler} type="submit">
              Save changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
