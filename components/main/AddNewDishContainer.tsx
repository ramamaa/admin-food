import { AddNewDish } from "./AddNewDish";

export const AddNewDishContainer = () => {
  return (
    <div className="p-5 mt-6 ml-6 mr-10 bg-background flex gap-4 flex-col">
      <h1 className="text-foreground font-semibold leading-7 text-xl">
        Appetizers
      </h1>
      <AddNewDish />
    </div>
  );
};
