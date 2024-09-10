import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CiFileOn } from "react-icons/ci";
import { addFile, setSelectedFileId } from "../redux/features/folderSlice";
import { v4 as uuidv4 } from "uuid";

const Files = () => {
  const dispatch = useDispatch();

  const { folders, selectedFolderId, selectedFileId } = useSelector(
    (state) => state.folder
  );
  const selectedFolder = folders.find(
    (folder) => folder.id === selectedFolderId
  );

  const [fileName, setFileName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleFileClickIcon = () => {
    setShowInput(!showInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (fileName.trim() && selectedFolderId) {
        const newFile = { id: uuidv4(), name: fileName.trim(), data: "" };
        dispatch(addFile({ folderId: selectedFolderId, file: newFile }));
        setFileName("");
        setShowInput(false);
      } else {
        console.error("File name is empty or no folder selected.");
      }
    }
  };

  const handleFileClick = (id) => {
    dispatch(setSelectedFileId(id));
  };

  return (
    <div className="border-r border-gray-300 min-h-[38rem] flex-grow p-2 bg-gray-100">
      {selectedFolder ? (
        <div className="flex cursor-pointer">
          <CiFileOn className=" text-2xl mb-2" onClick={handleFileClickIcon} />
          <span onClick={handleFileClickIcon}>Create File</span>
        </div>
      ) : null}
      {showInput && (
        <div className="mb-2">
          <input
            type="text"
            placeholder="Enter File Name"
            value={fileName}
            onKeyDown={handleKeyDown}
            onChange={(e) => setFileName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
      )}
      {selectedFolder ? (
        selectedFolder.files.length > 0 ? (
          selectedFolder.files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center gap-2 cursor-pointer p-2 rounded ${
                file.id === selectedFileId ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
              onClick={() => handleFileClick(file.id)}
            >
              <CiFileOn />
              <span>{file.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No files in this folder</p>
        )
      ) : (
        <p className="text-gray-500">Create File.</p>
      )}
    </div>
  );
};

export default Files;
