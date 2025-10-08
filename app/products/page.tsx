import { AddDishesCategoryContainer } from "@/components/main/AddDishesCategoryContainer";
import { AdminLayout } from "../_components/AdminLayout";
import { AddNewDishContainer } from "@/components/main/AddNewDishContainer";

const ProductsPage = () => {
  return (
    <AdminLayout>
      <AddDishesCategoryContainer />
      <AddNewDishContainer />
    </AdminLayout>
  );
};

export default ProductsPage;
