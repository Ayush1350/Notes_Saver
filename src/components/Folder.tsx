import { useEffect, useState, KeyboardEvent, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createFolder,
  setSelectedFolderId,
  removeFolder,
  renameFolder,
  moveFile,
} from "../redux/features/folderSlice";
import { toggleSwitch } from "../redux/features/toggleSlice";
import { FaFolder } from "react-icons/fa";
import { RootState } from "../redux/store";

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  folderId: string | null;
}

const Folder = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state: RootState) => state.toggle.isOn);
  const { folders, selectedFolderId } = useSelector(
    (state: RootState) => state.folder
  );

  const [folderName, setFolderName] = useState<string>("");
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    folderId: null,
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (folderName.trim()) {
        dispatch(createFolder(folderName.trim()));
        setFolderName("");
        dispatch(toggleSwitch(false));
      }
    }
  };

  useEffect(() => {
    if (folders.length > 0 && selectedFolderId === null) {
      dispatch(setSelectedFolderId(folders[0].id));
    }
  }, [folders, selectedFolderId, dispatch]);

  const handleFolderClick = (id: string) => {
    if (selectedFolderId === id) {
      dispatch(setSelectedFolderId(null));
    } else {
      dispatch(setSelectedFolderId(id));
    }
  };

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement>,
    folderId: string
  ) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      folderId,
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

  const handleDeleteClick = (id: string | null) => {
    if (id) dispatch(removeFolder(id));
  };

  const handleUpdateClick = (id: string | null) => {
    if (id) {
      const rename = prompt("Rename Folder");
      if (rename && rename.trim()) {
        dispatch(renameFolder({ id, newName: rename.trim() }));
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, folderId) => {
    e.preventDefault();
    const fileID = e.dataTransfer.getData("text/plain");
    dispatch(moveFile({ fileID, targetFolderId: folderId }));
    // console.log("Dropped file ID:", fileID, "into folder ID:", folderId);
  };

  return (
    <div className="flex flex-col border-r border-gray-300 w-[50%] flex-grow p-2 bg-gray-100">
      {toggle && (
        <input
          type="text"
          placeholder="Enter Folder Name"
          onChange={(e) => setFolderName(e.target.value)}
          onKeyDown={handleKeyDown}
          value={folderName}
          className="border border-gray-300 p-2 mb-2 rounded"
          autoFocus
        />
      )}
      <div className="flex flex-col gap-2">
        {folders && folders.length > 0 ? (
          folders.map((folder) => (
            <div
              key={folder.id}
              className={`flex items-center gap-2 cursor-pointer p-2 rounded ${
                folder.id === selectedFolderId
                  ? "bg-gray-300"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleFolderClick(folder.id)}
              onContextMenu={(e) => handleContextMenu(e, folder.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, folder.id)}
            >
              <FaFolder />
              <span>{folder.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Create Folder.</p>
        )}
      </div>

      {contextMenu.visible && (
        <div
          className="absolute bg-white border border-gray-300 shadow-lg  rounded flex gap-2 flex-col"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          <button
            className="text-red-500 hover:bg-gray-200 rounded p-2"
            onClick={() => handleDeleteClick(contextMenu.folderId)}
          >
            Delete Folder
          </button>
          <button
            className="text-blue-500 hover:bg-gray-200 rounded p-2"
            onClick={() => handleUpdateClick(contextMenu.folderId)}
          >
            Rename Folder
          </button>
        </div>
      )}
    </div>
  );
};

export default Folder;
