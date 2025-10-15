"use client";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const AddDishesCategoryContainer = () => {
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

  const newCategoryNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };
  const createCategoryHandler = async () => {
    await fetch("http://localhost:4000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newCategory,
      }),
    });
    setModalOpen(false);
    await getCategories();
  };

  const deleteCategoryHandler = async (id: string) => {
    await fetch("http://localhost:4000/api/categories/delete", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    await getCategories();
  };
  return (
    <div className="bg-white m-6 mr-10 p-6 flex flex-col gap-4">
      <h4 className="font-semibold text-xl leading -7 text-foreground">
        Dishes category
      </h4>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
          
            variant="outline"
            className="flex items-center border-1 rounded-full px-4 py-2 h-9 w-fit gap-2 hover:border-red-500 "
            key={category._id}>
            <p className=" text-secondary-foreground leading-5 font-medium text-sm ">
              {category.name}
            </p>
            <button
              className="hover:bg-gray-400/20 w-4 bg-primary px-2.5 py-0.5 text-primary-foreground flex items-center justify-center rounded-full"
              onClick={() => deleteCategoryHandler(category._id)}>
              X
            </button>
          </Badge>
        ))}
        <Dialog open={modalOpen}>
          <DialogTrigger asChild>
            <Badge
              onClick={() => setModalOpen(true)}
              variant={"outline"}
              className="cursor-pointer hover:bg-gray-500/20 text-white bg-red-500 rounded-full w-9 h-9">
              +
            </Badge>
          </DialogTrigger>
          <DialogContent className="w-[463px] p-6">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
            </DialogHeader>
            <Input
              type="text"
              placeholder="new category"
              onChange={newCategoryNameChangeHandler}
            />
            <Button onClick={createCategoryHandler}>Create</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
