import { useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store"; // Adjust import based on your actual store file
import { addDataInFile } from "../redux/features/folderSlice";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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

  const editor = useEditor({
    extensions: [StarterKit],
    content: selectedFile ? selectedFile?.data : "",
    onUpdate({ editor }) {
      if (selectedFileId) {
        dispatch(
          addDataInFile({
            folderId: selectedFolderId!,
            fileId: selectedFileId!,
            newData: editor.getHTML(),
          })
        );
      }
    },
  });

  useEffect(() => {
    if (selectedFile && editor) {
      editor.commands.setContent(selectedFile?.data);
    }
  }, [selectedFile, editor]);

  return (
    <div className="min-w-[50%] flex-grow p-2 bg-gray-100">
      {selectedFile ? (
        <>
          <div className="flex items-center cursor-pointer gap-1 mb-2">
            <FaPen className="text-xl" />
            <span className="mr-2">Your Notes</span>
            <button
              className="mr-2 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
              onClick={() => editor?.chain().focus().toggleBold().run()}
            >
              Bold
            </button>
            <button
              className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
              Italic
            </button>
          </div>
          <div className="border border-gray-300 mt-2 w-[100%]">
            <EditorContent
              editor={editor}
              className="border-none h-full w-[100%]"
              autoFocus
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
