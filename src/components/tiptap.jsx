'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Toolbar from './toolbar'

export default function TiptapEditor({
    content,
    onChange,
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            Underline.configure({ HTMLAttributes: { class: 'underline' } }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Highlight,
        ],
        content: content,
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
        editorProps: {
            attributes: {
                class: "rounded-md border min-h-[150px] p-2 border-input bg-background"
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
            //console.log(editor.getHTML())
        },
    })

    return (
        <div className="w-full h-full flex flex-col justify-stretch min-h-[250px] gap-1">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div> 
    )
}