"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Italic } from "lucide-react";
import createPost from "@/lib/actions/PostActions";
import UserAvatar from "../ui/UserAvatar";
import { useSession } from "@/lib/providers/SessionProvider";
import { Button } from "../ui/button";
export default function PostEditor() {
  const { user } = useSession();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's on your mind",
      }),
    ],
    immediatelyRender: false,
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  async function onSubmit() {
    await createPost(input);
    editor?.commands.clearContent();
  }

  return (
    <div className="flex flex-col gap-5 bg-primary-foreground p-5 rounded-xl  shadow-xl">
      <div className="flex gap-5 items-center">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className=" w-full h-full max-h-[20rem] overflow-auto bg-background shadow-sm rounded-2xl px-5 py-3 "
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={onSubmit} disabled={!input.trim()}>
          Post
        </Button>
      </div>
    </div>
  );
}
