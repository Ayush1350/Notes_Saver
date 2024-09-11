import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { addDataInFile } from "../redux/features/folderSlice";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
} from "react-icons/ai";

const FileData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { folders, selectedFolderId, selectedFileId } = useSelector(
    (state: RootState) => state.folder
  );

  const selectedFolder = folders.find(
    (folder) => folder.id === selectedFolderId
  );

  const selectedFile: any = selectedFolder
    ? selectedFolder.files.find((file) => file.id === selectedFileId)
    : null;

  const [activeFormat, setActiveFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: selectedFile ? selectedFile.data : "",
    onUpdate({ editor }) {
      if (selectedFileId) {
        dispatch(
          addDataInFile({
            folderId: selectedFolderId!,
            fileId: selectedFileId!,
            newData: editor.getJSON(),
          })
        );
      }

      setActiveFormat({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
      });
    },
  });

  useEffect(() => {
    if (editor && selectedFile) {
      const { selection } = editor.state;
      const pos = selection ? selection.$from.pos : 0;
      editor.commands.setContent(selectedFile?.data);
      editor.commands.setTextSelection(pos);
    }
  }, [selectedFile, editor]);

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
    setActiveFormat({
      ...activeFormat,
      bold: editor?.isActive("bold"),
    });
  };

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
    setActiveFormat({
      ...activeFormat,
      italic: editor?.isActive("italic"),
    });
  };

  const toggleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
    setActiveFormat({
      ...activeFormat,
      underline: editor?.isActive("underline"),
    });
  };

  return (
    <div className="min-w-[50%] flex-grow p-2 bg-gray-100">
      {selectedFile ? (
        <>
          <div className="flex items-center cursor-pointer gap-3 mb-2">
            <button
              className={`px-2 py-1 border border-gray-300 rounded flex items-center ${
                activeFormat.bold ? "bg-[#A6E3E9]" : "hover:bg-gray-100"
              }`}
              onClick={toggleBold}
            >
              <AiOutlineBold />
            </button>
            <button
              className={`px-2 py-1 border border-gray-300 rounded flex items-center ${
                activeFormat.italic ? "bg-[#A6E3E9]" : "hover:bg-gray-100"
              }`}
              onClick={toggleItalic}
            >
              <AiOutlineItalic />
            </button>
            <button
              className={`px-2 py-1 border border-gray-300 rounded flex items-center ${
                activeFormat.underline ? "bg-[#A6E3E9]" : "hover:bg-gray-100"
              }`}
              onClick={toggleUnderline}
            >
              <AiOutlineUnderline />
            </button>
          </div>

          <div className="border border-gray-300 mt-2 w-[100%] h-[93%] overflow-auto">
            <EditorContent
              editor={editor}
              className="border-none h-full w-[100%]"
              autoFocus
              onClick={() => editor?.commands.focus()}
            />
          </div>
        </>
      ) : (
        <p className="text-gray-500">Create File To Add Data.</p>
      )}
    </div>
  );
};

export default FileData;
