import { AddNewDish } from "@/components/main/AddNewDish";
import { AdminLayout } from "./_components/AdminLayout";

export default function Home() {
  return (
    <div>
      <AdminLayout>
        <h1>Header</h1>{" "}
      </AdminLayout>

      <AddNewDish></AddNewDish>
    </div>
  );
}
