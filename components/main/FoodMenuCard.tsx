

import { EditDishesDialog, FoodMenuType } from "./EditDishesDialog";

type FoodMenuCardProps = {
  food:FoodMenuType
};
const FoodMenuCard = ({
food
}: FoodMenuCardProps) => {
  const {  image,
  _id,
  price,
  ingredients,
  name,
  category} = food
  return (
    <div className="w-67.5 rounded-3xl border-1 bg-white p-4 ">
      <div>
        <img src={image} alt="" className="w-full h-full rounded-xl p-5" />
        <div>
          <EditDishesDialog id={_id}/>
        </div>
        <p className="text-red-500 leading-5 font-medium text-sm">{name}</p>
        <p>{price}$</p>
        <p>{ingredients}</p>
      </div>
    </div>
  );
};

export default FoodMenuCard;
