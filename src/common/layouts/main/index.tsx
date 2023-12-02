import { ReactNode } from "react";
import Sidebar from "@/common/layouts/main/components/Sidebar";

type ComponentProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: ComponentProps) {
  return (
    <div className="flex">
      <div className="p-2 h-dscreen">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
