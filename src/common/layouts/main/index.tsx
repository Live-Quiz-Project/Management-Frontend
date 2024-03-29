import { ReactNode } from "react";
import Sidebar from "@/common/layouts/main/components/Sidebar";

type ComponentProps = {
  children?: ReactNode;
};

export default function MainLayout({ children }: ComponentProps) {
  return (
    <div className="flex">
      <div className="h-dscreen">
        <Sidebar />
      </div>
      {children}
    </div>
  );
}
