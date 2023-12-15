import Topbar from "@/features/library/components/editor/Topbar";
import Sidebar from "@/features/library/components/editor/Sidebar";
import Display from "@/features/library/components/editor/Display";
import Pagebar from "@/features/library/components/editor/Pagebar";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { setCurType } from "../store/slice";

export default function EditorLayout() {
  const dispatch = useDispatch();
  const topbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setCurType("quiz"));
  }, []);

  return (
    <div className="h-screen bg-light-gray">
      <Topbar ref={topbarRef} />
      <div className="h-[calc(100%-4rem)] grid grid-cols-[7fr_3fr] gap-4 p-4">
        <div className="flex flex-col gap-4">
          <Display />
          <Pagebar />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
