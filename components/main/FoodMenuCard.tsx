import { EditDishesDialog } from "./EditDishesDialog";

type FoodMenuCardProps = {
  food: FoodType;
  refetchFoods: () => Promise<void>;
};
export const FoodMenuCard = ({ food, refetchFoods }: FoodMenuCardProps) => {
  const { image, _id, price, ingredients, name } = food;
  return (
    <div className="w-67.5 rounded-3xl border-1 bg-white p-4 flex flex-col gap-5">
      <div className="relative">
        <img src={image} alt="" className="w-full h-full rounded-xl " />
        <div className="absolute bottom-5 right-5">
          <EditDishesDialog id={_id} refetchFoods={refetchFoods} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between leading-5 text-sm">
          <p className="text-red-500  font-medium ">{name}</p>
          <p>{price}$</p>
        </div>
        <p className="leading-4 font-normal text-xs">{ingredients}</p>
      </div>
    </div>
  );
};
