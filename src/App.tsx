import FileData from "./components/FileData";
import Files from "./components/Files";
import Folder from "./components/Folder";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="flex flex-col items-center w-[50vw] min-h-[38rem] border border-gray-300 mt-20 ml-auto mr-auto">
        <div className="mb-4">
          <Header />
        </div>
        <div className="flex justify-between border-t border-gray-300 w-full flex-grow">
          <Folder />
          <Files />
          <FileData />
        </div>
      </div>
    </>
  );
}

export default App;
