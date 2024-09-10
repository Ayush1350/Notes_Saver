import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { editFile } from "../redux/features/folderSlice"; // Import editFile action

function FileData() {
  const dispatch = useDispatch();

  const [showInput, setShowInput] = useState(false);
  const [fileData, setFileData] = useState("");

  const { folders, selectedFolderId, selectedFileId } = useSelector(
    (state) => state.folder
  );

  const selectedFolder = folders.find(
    (folder) => folder.id === selectedFolderId
  );

  const selectedFile = selectedFolder
    ? selectedFolder.files.find((file) => file.id === selectedFileId)
    : null;

  // Update fileData whenever selectedFile changes
  useEffect(() => {
    if (selectedFile) {
      setFileData(selectedFile.data);
    }
  }, [selectedFile]);

  const handleClick = () => {
    setShowInput(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (fileData.trim() && selectedFileId) {
        dispatch(
          editFile({
            folderId: selectedFolderId,
            fileId: selectedFileId,
            newData: fileData.trim(),
          })
        );
        setShowInput(false);
      } else {
        console.error("File data is empty or no file selected.");
      }
    }
  };

  return (
    <div className="min-h-[38rem] flex-grow p-2 bg-gray-100">
      {selectedFile ? (
        <div className="flex items-center cursor-pointer gap-1">
          <FaPen className="text-xl mb-2" onClick={handleClick} />
          <span>Add Data</span>
        </div>
      ) : null}
      {showInput && selectedFile && (
        <div className="mb-2">
          <input
            type="text"
            placeholder="Edit File Data"
            value={fileData}
            onKeyDown={handleKeyDown}
            onChange={(e) => setFileData(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
      )}
      {selectedFile ? (
        <div>
          <p>{selectedFile.data}</p>
        </div>
      ) : (
        <p className="text-gray-500">Add Data.</p>
      )}
    </div>
  );
}

export default FileData;
