import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
export const AddDishesCategoryContainer = () => {
  const categories = [
    "All Dishes",
    "Appetizers",
    "Salads",
    "Launch favorites",
    "Main dishes",
  ];
  return (
    <div className="bg-white p-6 m-6 mr-10 flex flex-col gap-4">
      <h1 className="leading-7 text-xl font-semibold">Dishes category</h1>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant="outline"
            className="py-2 px-4 h-9 rounded-full hover:border-red-500"
          >
            <p className="text-sm leading-5 text-secondary-foreground font-medium">
              {category}
            </p>
          </Badge>
        ))}
        <Dialog>
          <DialogTrigger className="rounded-full w-9 h-9 bg-red-500 cursor-pointer text-white">
            +
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new category</DialogTitle>
            </DialogHeader>
            <div>
              <p className="text-sm leading-3.5">Category name</p>
              <Input placeholder="Type category name..." />
            </div>
            <Button className="w-fit flex justify-end">Add category</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
