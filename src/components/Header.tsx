import { FaRegFolder } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSwitch } from "../redux/features/toggleSlice";

function Header() {
  const dispatch = useDispatch();

  const toggle = useSelector((state) => state.toggle.isOn);

  const handleFolderClick = () => {
    dispatch(toggleSwitch(!toggle));
  };

  return (
    <>
      <div>
        <div
          className="flex gap-2 mt-2 cursor-pointer"
          onClick={handleFolderClick}
        >
          <FaRegFolder className="cursor-pointer text-2xl" />
          <span>Create Folder</span>
        </div>
      </div>
    </>
  );
}

export default Header;
