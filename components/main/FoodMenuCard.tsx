"use client";
import { Pen, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
   const [categories, setCategories] = useState<categoriesTypeProps[]>([]);
  const [newCategory, setNewCategory] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
    const getCategories = async () => {
    const result = await fetch("http://localhost:4000/api/categories");
    const responseData = await result.json();
    console.log({ responseData });
    const { data } = responseData;
    console.log(data);
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);
  
  return (
    <div className="w-67.5 rounded-3xl border-1 bg-white p-4">
      <div>
        <img src={image} alt="" className="w-full h-full rounded-xl p-5" />
        <Dialog>
          <DialogTrigger>
            <Pen className="w-4 h-4" color="red" />
          </DialogTrigger>
          <DialogContent className="max-w-[472px] p-6">
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
              />
            </div>
            <div className="flex gap-4 justify-between">
               <Label htmlFor="price">Dish category</Label>
            <Select>
              <SelectTrigger className="w-[288px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category)=>( <SelectItem value={category._id} key={category._id}> {category.name}</SelectItem>))}
                
                </SelectGroup>
              </SelectContent>
            </Select>

            </div>
            <div className="flex gap-4 justify-between">
              <Label htmlFor="price">Ingredients</Label>
              <Input
                id="price"
                name="price"
                type="string"
                className="w-[288px]"
              />
            </div>
            <div className="flex gap-4 justify-between">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                className="w-[288px]"
              />
            </div>
            <div className="flex gap-4 justify-between h-36">
              <Label htmlFor="price">Image</Label>
              <Input
                id="price"
                name="price"
                type="file"
                className="w-[288px] h-full"
              />
            </div>

            <div className="flex sm:justify-between justify-between">
              <Button
                className="bg-white border-red-500 border-1 py-2 px-4"
                variant="destructive"
              >
                <Trash color="red" />
              </Button>
              <Button>Save changes</Button>
            </div>
          </DialogContent>
        </Dialog>
        <p className="text-red-500 leading-5 font-medium text-sm">{name}</p>
        <p>{price}$</p>
        <p>{ingredients}</p>
      </div>
    </div>
  );
};

export default FoodMenuCard;
