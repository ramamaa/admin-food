import { AddDishesCategoryContainer } from "@/components/main/AddDishesCategoryContainer";
import { AdminLayout } from "../_components/AdminLayout";

import { AddNewDish } from "@/components/main/AddNewDish";

const ProductsPage = () => {
  return (
    <AdminLayout>
      <AddDishesCategoryContainer />
      <AddNewDish />
    </AdminLayout>
  );
};

export default ProductsPage;
