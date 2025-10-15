import React from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
export const OrderHeader = () => {
  return (
    <div className="flex justify-between p-4 bg-white ml-6 mr-10 mt-6">
      <div className="flex flex-col">
        <h1 className="font-bold leading-7 text-xl">Orders</h1>
        <p className="text-muted-foreground leading-4 text-xs font-medium">32 items</p>
      </div>
      <div className="flex gap-3">
        <Input type="date" className="rounded-full h-9" />
        <Badge className="rounded-full h-9 px-4">
          <Dialog>
            <DialogTrigger>Change delivery state</DialogTrigger>
            <DialogContent className="w-91 p-6">
              <DialogHeader className="flex flex-col gap-6">
                <DialogTitle>Change delivery state</DialogTitle>
                <div className="flex justify-around gap-4">
              
                  <Badge variant="default" className="rounded-full px-2.5 py-2 leading-4 text-xs">Deliverd</Badge>
                  <Badge variant="outline" className="rounded-full px-2.5 py-2 leading-4 text-xs" >Pending</Badge>
                  <Badge variant="outline" className="rounded-full px-2.5 py-2 leading-4 text-xs">Cancelled</Badge>
                </div>
                <Button className="rounded-full">Save</Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Badge>
      </div>
    </div>
  );
};
