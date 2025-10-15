"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ChangeEvent, useEffect, useState } from "react";
import { FoodMenuCardContainer } from "./FoodMenuCardContainer";
import { CategoryType } from "./EditDishesDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
export const AddNewDish = () => {
  const [image, setImage] = useState<File | undefined>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foodsMenu, setFoodsMenu] = useState<foodsTypeProps[]>([]);
  const getCategories = async () => {
    const response = await fetch("http://localhost:4000/api/categories");
    const data = await response.json();
    setCategories(data.data);
  };

  useEffect(() => {
    getCategories();
  }, []);
  const getFoodMenu = async () => {
    const result = await fetch("http://localhost:4000/api/food");
    const responseData = await result.json();

    const { data } = responseData;

    setFoodsMenu(data);
  };

  useEffect(() => {
    getFoodMenu();
  }, []);
  // || !category
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
        method: "POST",
        body: form,
      });
      // setCategory("");
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
    await getFoodMenu();
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

  return (
    <div className="p-5 mt-6 ml-6 mr-10  bg-background flex gap-4 ">
      {/* {foods
        .filter((food: any) => food.category === "Appetizers")
        .map((food: any) => (
          <div key={food.category}>
            <h3 className="font-semibold text-lg">
              {food.category} {food.items.length}
            </h3>
          </div>
        ))} */}
      <div className="flex gap-5">
        <div className="w-70 h-60 border-dashed border rounded-2xl border-red-500 flex items-center justify-center py-2 px-4">
          <div className="flex flex-col gap-6 justify-center items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full bg-red-500 text-white w-10 h-10">
                  +
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Food</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={name}
                      onChange={nameChangeHandler}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={price}
                      onChange={priceChangeHandler}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                      id="picture"
                      type="file"
                      onChange={fileChangeHandler}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <Input
                      id="ingredients"
                      name="ingredients"
                      value={ingredients}
                      onChange={ingredientsChangeHandler}
                    />
                  </div>
                  <div className="grid gap-3">
                    {categories.length > 0 && (
                      <Select
                        onValueChange={(value) => setSelectedCategory(value)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => {
                            return (
                              <SelectItem
                                key={category._id}
                                value={category._id}>
                                {category.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <Button
                    type="submit"
                    size={"sm"}
                    className="w-fit px-4 py-[10px]"
                    onClick={addFoodHandler}>
                    <p className="leading-5"> Save changes</p>
                  </Button>
                </div>
                <DialogFooter></DialogFooter>
              </DialogContent>
            </Dialog>
            <div className="font-medium text-secondary-foreground text-sm leading-5">
              Add new Dish to Appetizers
            </div>
          </div>
        </div>
        <div className="w-full">
          <FoodMenuCardContainer foods={foodsMenu} />
        </div>
      </div>
    </div>
  );
};
