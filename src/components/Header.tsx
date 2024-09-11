import { FC } from "react";
import { FiFolderPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleSwitch } from "../redux/features/toggleSlice";

const Header: FC = () => {
  const dispatch = useDispatch();

  const handleFolderClick = () => {
    dispatch(toggleSwitch());
  };

  return (
    <div>
      <div
        className="flex gap-2 mt-2 cursor-pointer"
        onClick={handleFolderClick}
      >
        <FiFolderPlus className="cursor-pointer text-2xl" />
        <span>Create Folder</span>
      </div>
    </div>
  );
};

export default Header;
