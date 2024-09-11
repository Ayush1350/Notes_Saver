import FileData from "./components/FileData";
import Files from "./components/Files";
import Folder from "./components/Folder";
import Header from "./components/Header";

function App() {
  return (
    <>
      <h1 className="saveNoteH1 absolute left-[38%] top-[1rem] text-[2.8rem] font-[500]">
        Save Your Notes
      </h1>
      <div className="flex flex-col items-center w-[70vw]  bg-[#93B5C6] mt-[6rem] ml-auto mr-auto">
        <div className="mb-4">
          <Header />
        </div>
        <div className="flex justify-between  w-full h-[70vh] flex-grow">
          <Folder />
          <Files />
          <FileData />
        </div>
      </div>
    </>
  );
}

export default App;
