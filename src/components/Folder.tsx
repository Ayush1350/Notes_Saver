import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addFolder,
  setSelectedFolderId,
  selectedFolderId,
} from "../redux/features/folderSlice";
import { toggleSwitch } from "../redux/features/toggleSlice";
import { FaFolder } from "react-icons/fa";

const Folder = () => {
  const dispatch = useDispatch();

  const toggle = useSelector((state) => state.toggle.isOn);

  const { folders, selectedFolderId } = useSelector((state) => state.folder);

  const [folderName, setFolderName] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (folderName.trim()) {
        dispatch(addFolder(folderName.trim()));
        setFolderName("");
        dispatch(toggleSwitch(false));
      }
    }
  };

  useEffect(() => {
    if (folders.length > 0 && selectedFolderId === null) {
      dispatch(setSelectedFolderId(folders[0].id));
    }
  }, [folders, selectedFolderId]);

  const handleFolderClick = (id) => {
    if (selectedFolderId === id) {
      dispatch(selectedFolderId(null));
    } else {
      dispatch(setSelectedFolderId(id));
    }
  };

  return (
    <div className="flex flex-col border-r border-gray-300 min-h-[38rem] flex-grow p-2 bg-gray-100">
      {toggle && (
        <input
          type="text"
          placeholder="Enter Folder Name"
          onChange={(e) => setFolderName(e.target.value)}
          onKeyDown={handleKeyDown}
          value={folderName}
          className="border border-gray-300 p-2 mb-2 rounded"
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
            >
              <FaFolder />
              <span>{folder.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Create Folder.</p>
        )}
      </div>
    </div>
  );
};

export default Folder;
