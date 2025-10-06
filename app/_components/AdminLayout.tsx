import { ReactNode } from "react";
import { Header } from "./Header";
import { SideBar } from "./SideBar";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex">
        <SideBar />
        <div className="w-full">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
};
