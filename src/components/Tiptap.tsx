import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="border border-gray-300  rounded-md w-[25rem] h-[50rem]">
      <EditorContent
        editor={editor}
        className="focus:outline-none h-full w-[100%]"
      />

      {editor && (
        <>
          <FloatingMenu
            editor={editor}
            className="bg-white shadow-md p-2 rounded-md"
          >
            <button
              className="mr-2 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              Bold
            </button>
            <button
              className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              Italic
            </button>
          </FloatingMenu>

          <BubbleMenu
            editor={editor}
            className="bg-white shadow-md p-2 rounded-md"
          >
            <button
              className="mr-2 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              Bold
            </button>
            <button
              className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              Italic
            </button>
          </BubbleMenu>
        </>
      )}
    </div>
  );
};

export default Tiptap;
