import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addDataInFile } from "../redux/features/folderSlice"; // Import editFile action

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
    if (showInput) {
      if (fileData.trim() && selectedFileId) {
        dispatch(
          addDataInFile({
            folderId: selectedFolderId,
            fileId: selectedFileId,
            newData: fileData.trim(),
          })
        );
      }
      setShowInput(false);
    } else {
      setShowInput(!showInput);
    }
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     if (fileData.trim() && selectedFileId) {
  //       dispatch(
  //         editFile({
  //           folderId: selectedFolderId,
  //           fileId: selectedFileId,
  //           newData: fileData.trim(),
  //         })
  //       );
  //       setShowInput(false);
  //     } else {
  //       console.error("File data is empty or no file selected.");
  //     }
  //   }
  // };

  return (
    <div className="min-h-[38rem] flex-grow p-2 bg-gray-100">
      {selectedFile ? (
        <div
          className="flex items-center cursor-pointer gap-1"
          onClick={handleClick}
        >
          <FaPen className="text-xl mb-2" />
          <span>{showInput ? "Modify Data" : "Add Data"}</span>
        </div>
      ) : null}
      {showInput && selectedFile && (
        <div className="mb-2">
          <textarea
            placeholder="Edit File Data"
            value={fileData}
            onChange={(e) => setFileData(e.target.value)}
            className="w-full min-h-[38rem] p-4 bg-gray-100 resize-none"
          />
        </div>
      )}
      {selectedFile ? (
        <div>
          <textarea className="w-full min-h-[38rem] p-4 bg-gray-100 resize-none">
            {selectedFile.data}
          </textarea>
        </div>
      ) : (
        <p className="text-gray-500">Add Data.</p>
      )}
    </div>
  );
}

export default FileData;
