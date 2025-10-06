import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export const AddNewDish = () => {
  return (
    <div>
      <div className="w-70 h-60 border-dashed border rounded-2xl border-red-500 flex items-center justify-center py-2 px-4">
        <div className="flex flex-col gap-6 justify-center items-center">
          <Dialog>
            <form>
              <DialogTrigger className="rounded-full w-10 h-10 bg-red-500 text-white">
                +
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add new Dish to Appetizers</DialogTitle>
                </DialogHeader>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name-1">Food name</Label>
                    <Input
                      id="name-1"
                      name="name"
                      placeholder="Type food name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="username-1">Food Price</Label>
                    <Input
                      id="username-1"
                      name="username"
                      placeholder="Enter price..."
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="username-1">Ingredients</Label>
                  <Input
                    id="username-1"
                    name="username"
                    placeholder="List ingredients..."
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="username-1">Food image</Label>
                  <Input
                    id="username-1"
                    name="username"
                    type="file"
                    className="w-full h-35"
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Add Dish</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
          <div className="font-medium text-secondary-foreground text-sm leading-5">
            Add new Dish to Appetizers
          </div>
        </div>
      </div>
    </div>
  );
};
