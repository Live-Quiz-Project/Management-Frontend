import Topbar from "@/features/library/components/editor/Topbar";
import Sidebar from "@/features/library/components/editor/sidebar";
import Display from "@/features/library/components/editor/display";
import Pagebar from "@/features/library/components/editor/pagebar";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCurPage,
  setEditing,
  setSideBarExpanded,
} from "@/features/library/store/slice";
import { MdCloseFullscreen, MdOutlineOpenInFull } from "react-icons/md";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";

export default function EditorLayout() {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);
  const curPage =
    editor.value.quiz &&
    (editor.value.curPage === 0
      ? "Q"
      : editor.value.quiz!.questions.reduce((acc, cur) => {
          if (!cur.isInPool && cur.order <= editor.value.curPage) acc++;
          return acc;
        }, 0));
  const subCurPage =
    editor.value.quiz &&
    editor.value.quiz!.questions[editor.value.curPage - 1] &&
    editor.value.quiz!.questions[editor.value.curPage - 1].isInPool &&
    editor.value.quiz!.questions[editor.value.curPage - 1].order -
      editor.value.quiz!.questions[editor.value.curPage - 1].pool;
  const maxPage =
    editor.value.quiz &&
    editor.value.quiz!.questions.length > 0 &&
    editor.value.quiz!.questions.filter((q) => !q.isInPool).length;

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave? Changes you made may not be saved.";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  if (editor.value.quiz)
    return (
      <div className="h-screen bg-beige relative">
        <Topbar className="font-sans-serif text-body-1" />
        <div
          className={`relative h-[calc(100%-3rem)] md:h-[calc(100%-4rem)] overflow-hidden grid grid-cols-[1fr_auto] grid-flow-col gap-2.5 md:gap-4 p-2.5 md:p-4 !pt-0 transition-all duration-300 ${
            editor.value.editing
              ? "grid-rows-2 md:grid-rows-[1fr_auto]"
              : "grid-rows-[1fr_auto]"
          }`}
        >
          <Display className="col-span-2 md:col-span-1 transition-all duration-300 bg-quill-gray/0 border border-dashed border-regent-gray" />
          <Pagebar
            className="h-40 sm:h-48 md:h-40 lg:h-44 xl:h-48 2xl:h-56 col-span-2 md:col-span-1 transition-all duration-300 font-sans-serif bg-karry"
            maxPage={maxPage!}
            curPage={curPage!}
            subCurPage={subCurPage!}
          />
          <div
            className={`absolute ${
              editor.value.editing
                ? editor.value.sidebarExpanded
                  ? "!row-start-1 top-0"
                  : "top-0"
                : "top-full"
            } left-1/2 -translate-x-1/2 md:translate-x-0 md:static h-full w-[calc(100%-1rem)] md:w-72 lg:w-80 xl:w-96 2xl:w-[30rem] md:row-span-2 row-start-2 bg-quartz transition-all duration-300 rounded-t-2xl rounded-b-none md:rounded-3xl`}
          >
            <Sidebar className="w-full h-full font-sans-serif" />
            {editor.value.editing && (
              <div className="absolute top-0 right-0 md:hidden grid grid-cols-[auto_1fr_auto] divide-white divide-x bg-jordy-blue text-white rounded-tr-2xl rounded-bl-2xl md:rounded-tr-3xl md:rounded-bl-3xl transition-all duration-300 font-sans-serif text-body-1 z-20">
                <button
                  className="flex justify-center items-center px-2 py-1"
                  onClick={() => {
                    dispatch(setSideBarExpanded(false));
                    dispatch(setEditing(false));
                  }}
                >
                  <IoClose className="w-5 h-5" />
                </button>
                <div className="flex">
                  <button
                    className="flex justify-center items-center pl-2 py-1 disabled:cursor-not-allowed disabled:text-white/50"
                    onClick={() =>
                      dispatch(setCurPage(editor.value.curPage - 1))
                    }
                    disabled={editor.value.curPage <= 0}
                  >
                    <IoChevronBack className="w-5 h-5" />
                  </button>
                  <p className="flex justify-center items-center px-2 py-1">
                    {maxPage && (
                      <>
                        {curPage}
                        {subCurPage && `.${subCurPage}`}
                        &nbsp;/&nbsp;
                        {maxPage}
                      </>
                    )}
                  </p>
                  <button
                    className="flex justify-center items-center pr-2 py-1 disabled:cursor-not-allowed disabled:text-white/50"
                    onClick={() =>
                      dispatch(setCurPage(editor.value.curPage + 1))
                    }
                    disabled={
                      editor.value.curPage >=
                      editor.value.quiz!.questions.length
                    }
                  >
                    <IoChevronForward className="w-5 h-5" />
                  </button>
                </div>
                <button
                  className="flex justify-center items-center px-2 py-1"
                  onClick={() =>
                    dispatch(setSideBarExpanded(!editor.value.sidebarExpanded))
                  }
                >
                  {editor.value.sidebarExpanded ? (
                    <MdCloseFullscreen className="w-4 h-4" />
                  ) : (
                    <MdOutlineOpenInFull className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
