import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {
  MdOutlinePermMedia,
  MdOutlineImage,
  MdOutlineVideoCameraBack,
  MdOutlineAudioFile,
} from "react-icons/md";
import {
  ref,
  uploadBytes,
  listAll,
  deleteObject,
  StorageReference,
} from "firebase/storage";
import { IoClose } from "react-icons/io5";
import { storage } from "@/common/services/firebase";
import useTypedSelector from "@/common/hooks/useTypedSelector";

type Props = {
  folderName: string;
  acceptImage?: boolean;
  acceptVideo?: boolean;
  acceptAudio?: boolean;
  onChange: (file: string) => void;
};

export default function FileUploader({
  folderName,
  acceptImage = true,
  acceptVideo = false,
  acceptAudio = false,
  onChange,
}: Props) {
  const editor = useTypedSelector((state) => state.editor);
  const [file, setFile] = useState<StorageReference | null>(null);
  const [dragover, setDragover] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setPending(true);
      try {
        const res = await listAll(ref(storage, folderName));
        if (res.items.length > 0) {
          res.items.forEach((item) => {
            setFile(item);
            onChange(item.fullPath);
          });
        } else {
          setFile(null);
          onChange("");
        }
      } catch (error) {
        alert(error);
      } finally {
        setPending(false);
      }
    })();
  }, [
    editor.value.quiz?.questions[editor.value.curPage - 1]
      ? editor.value.quiz!.questions[editor.value.curPage - 1].mediaType
      : null,
  ]);

  async function onUploadFile(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPending(true);
    const filePath = `${folderName}/${e.currentTarget.files![0].name}`;
    const storageRef = ref(storage, filePath);
    try {
      await uploadBytes(storageRef, e.currentTarget.files![0]);
      setFile(storageRef);
      onChange(filePath);
    } catch (error) {
      alert(error);
    } finally {
      setPending(false);
    }
  }

  async function onDeleteFile(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setPending(true);
    try {
      await deleteObject(file!);
      setFile(null);
      onChange("");
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  }

  return file ? (
    <div className="relative flex justify-between items-center bg-white w-full space-x-4 rounded-xl h-10 xl:h-12 px-3 xl:px-4 overflow-hidden">
      <p className="leading-tight truncate">{file.name}</p>
      <button onClick={onDeleteFile}>
        <IoClose className="text-black hover:text-red w-5 h-5 transition-all duration-300" />
      </button>
      {pending && (
        <div className="w-full h-full absolute top-0 left-0 !m-0 rounded-lg flex justify-center items-center">
          <div className="bg-white opacity-80 blur-sm w-full h-full" />
          <span className="absolute w-10 h-10 border-4 border-quill-gray/50 rounded-full animate-spin">
            <span className="absolute top-0 left-0 bg-sienna w-2 h-2 rounded-full translate-x-1/2" />
          </span>
        </div>
      )}
    </div>
  ) : (
    <div className="relative bg-white rounded-xl text-regent-gray p-8 justify-center items-center overflow-hidden">
      <div className="space-y-2 flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center space-x-4 xl:space-x-6">
          {(acceptImage && acceptVideo && acceptAudio) ||
          (acceptImage && acceptVideo) ||
          (acceptImage && acceptAudio) ||
          (acceptVideo && acceptAudio) ? (
            <MdOutlinePermMedia className="min-w-8 min-h-8" />
          ) : acceptImage ? (
            <MdOutlineImage className="min-w-8 min-h-8" />
          ) : acceptVideo ? (
            <MdOutlineVideoCameraBack className="min-w-8 min-h-8" />
          ) : (
            <MdOutlineAudioFile className="min-w-8 min-h-8" />
          )}
          <p className="text-left leading-tight">
            Drag and drop or click to add&nbsp;
            {acceptImage && acceptVideo && acceptAudio
              ? "media"
              : acceptImage && acceptVideo
              ? "image or video"
              : acceptImage && acceptAudio
              ? "image or audio"
              : acceptVideo && acceptAudio
              ? "video or audio"
              : acceptImage
              ? "image"
              : acceptVideo
              ? "video"
              : "audio"}
          </p>
        </div>
        {dragover && (
          <div className="bg-quill-gray opacity-40 w-full h-full absolute top-0 left-0 !m-0 rounded-lg flex justify-center items-center" />
        )}
        {pending && (
          <div className="w-full h-full absolute top-0 left-0 !m-0 rounded-lg flex justify-center items-center">
            <div className="bg-white opacity-80 blur-sm w-full h-full" />
            <span className="absolute w-10 h-10 border-4 border-quill-gray/50 rounded-full animate-spin">
              <span className="absolute top-0 left-0 bg-sienna w-2 h-2 rounded-full translate-x-1/2" />
            </span>
          </div>
        )}
      </div>
      <input
        type="file"
        className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
        accept={`${acceptImage ? "image/*, " : ""}${
          acceptVideo ? "video/*, " : ""
        }${acceptAudio ? "audio/*" : ""}`}
        onChange={onUploadFile}
        onDragEnter={() => setDragover(true)}
        onDragLeave={() => setDragover(false)}
        onDrop={() => setDragover(false)}
        disabled={pending || file !== null}
      />
    </div>
  );
}
