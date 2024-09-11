import { useState, useEffect, KeyboardEvent, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CiFileOn } from "react-icons/ci";
import {
  createFile,
  setSelectedFileId,
  removeFile,
  renameFile,
} from "../redux/features/folderSlice";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../redux/store";

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  fileId: string | null;
}

const Files = () => {
  const dispatch = useDispatch();

  const { folders, selectedFolderId, selectedFileId } = useSelector(
    (state: RootState) => state.folder
  );
  const selectedFolder = folders.find(
    (folder) => folder.id === selectedFolderId
  );

  const [fileName, setFileName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    fileId: null,
  });

  const handleFileClickIcon = () => {
    setShowInput(!showInput);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (fileName.trim() && selectedFolderId) {
        const newFile = { id: uuidv4(), name: fileName.trim(), data: "" };
        dispatch(createFile({ folderId: selectedFolderId, file: newFile }));
        setFileName("");
        setShowInput(false);
      } else {
        console.error("File name is empty or no folder selected.");
      }
    }
  };

  const handleFileClick = (id: string) => {
    dispatch(setSelectedFileId(id));
  };

  useEffect(() => {
    if (selectedFileId === null) {
      dispatch(setSelectedFileId(selectedFolder?.files[0].id));
    }
  }, [selectedFolder, selectedFileId, dispatch]);

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>, fileId: string) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      fileId,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({
      ...contextMenu,
      visible: false,
    });
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.visible) closeContextMenu();
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu.visible]);

  const handleDeleteClick = (fileId: string | null) => {
    if (selectedFolderId && fileId) {
      dispatch(removeFile({ folderId: selectedFolderId, fileId }));
    }
  };

  const handleUpdateClick = (fileId: string | null) => {
    const newName = prompt("Rename File");
    if (newName && newName.trim() && selectedFolderId) {
      dispatch(
        renameFile({
          folderId: selectedFolderId,
          fileId,
          newName: newName.trim(),
        })
      );
    }
  };

  const handleDragStart = (e, fileId) => {
    // console.log("Starting drag with file ID:", fileId);
    e.dataTransfer.setData("text/plain", fileId.toString());
  };

  return (
    <div className="border-r border-gray-300 w-[70%] flex-grow p-2 bg-gray-100">
      {selectedFolder ? (
        <div className="flex cursor-pointer">
          <CiFileOn className="text-2xl mb-2" onClick={handleFileClickIcon} />
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
            autoFocus
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
              onContextMenu={(e) => handleContextMenu(e, file.id)}
              draggable
              onDragStart={(e) => handleDragStart(e, file.id)}
            >
              <CiFileOn />
              <span>{file.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No files in this folder</p>
        )
      ) : (
        <p className="text-gray-500">Create Folder To Create File.</p>
      )}

      {contextMenu.visible && (
        <div
          className="absolute bg-white border border-gray-300 shadow-lg rounded flex gap-2 flex-col"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          <button
            className="text-red-500 hover:bg-gray-200 rounded p-2"
            onClick={() => handleDeleteClick(contextMenu.fileId)}
          >
            Delete File
          </button>
          <button
            className="text-blue-500 hover:bg-gray-200 rounded p-2"
            onClick={() => handleUpdateClick(contextMenu.fileId)}
          >
            Rename File
          </button>
        </div>
      )}
    </div>
  );
};

export default Files;
