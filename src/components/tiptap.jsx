'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './toolbar'


export default function Tiptap({
    text,
    setText,
}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: text,
        editorProps: {
            attributes: {
                class: "rounded-md border min-h-[150px] p-2 border-input bg-background"
            },
        },
        onUpdate: ({ editor }) => {
            setText(editor.getHTML())
            console.log(editor.getHTML())
        },
    })

    return (
        <div className="w-full h-full flex flex-col justify-stretch min-h-[250px] gap-1">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div> 
    )
}