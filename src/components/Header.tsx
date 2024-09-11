import { FC } from "react";
import { FiFolderPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Adjust this import based on where your store type is defined
import { toggleSwitch } from "../redux/features/toggleSlice";

const Header: FC = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state: RootState) => state.toggle.isOn);

  const handleFolderClick = () => {
    dispatch(toggleSwitch(!toggle));
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
