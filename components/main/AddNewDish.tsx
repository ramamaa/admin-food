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

import { ChangeEvent, useState } from "react";

export const AddNewDish = ({
  foods,
  category,
  refetchFoods,
}: {
  foods: FoodType[];
  category: CategoryType;
  refetchFoods: () => Promise<void>;
}) => {
  const [image, setImage] = useState<File | undefined>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>("");

  const addFoodHandler = async () => {
    if (!name || !price || !image || !ingredients) {
      alert("All fields are required");
      return;
    }

    const form = new FormData();

    form.append("name", name);
    form.append("price", String(price));
    form.append("image", image); // File object
    form.append("ingredients", ingredients);
    form.append("categoryId", category._id);

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
        await refetchFoods();
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

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold leading-7">
        {category.name} {foods.length}
      </h2>
      <div className="flex gap-5">
        <Dialog>
          <DialogTrigger asChild>
            <div className=" w-70 h-60 border-dashed border rounded-2xl border-red-500 flex flex-col gap-6 items-center justify-center py-2 px-4 cursor-pointer">
              <div className="flex flex-col gap-6 justify-center items-center">
                <Button
                  variant="outline"
                  className="rounded-full bg-red-500 text-white w-10 h-10">
                  +
                </Button>
              </div>
              <div className="font-medium text-secondary-foreground text-sm leading-5">
                Add new Dish to {category.name}
              </div>
            </div>
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
                  defaultValue={name}
                  onChange={nameChangeHandler}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={price}
                  onChange={priceChangeHandler}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" onChange={fileChangeHandler} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="ingredients">Ingredients</Label>
                <Input
                  id="ingredients"
                  name="ingredients"
                  defaultValue={ingredients}
                  onChange={ingredientsChangeHandler}
                />
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

        <div className="w-full"></div>
      </div>
    </div>
  );
};
