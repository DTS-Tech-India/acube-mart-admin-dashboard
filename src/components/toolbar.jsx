"use client"

import {
    Bold,
    Italic,
    Strikethrough,
    Underline,
    UnorderedList,
    OrderedList,
    Heading1,
    Heading2,
    Link,
    Image,
    Code2,
    SeparatorHorizontalIcon,
    Quote,
} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"


export default function Toolbar({ editor }) {
    if (!editor) {
        return null
    }

    return (
        <div className="flex items-center gap-1 border border-input bg-transparent rounded-md">
            <Toggle
                size="sm"
                pressed={editor.isActive('heading', { level: 1 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                <Heading1 className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('heading', { level: 2 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('bold')}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('italic')}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('strike')}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className="h-4 w-4" />
            </Toggle>

            {/* <Toggle
                size="sm"
                pressed={editor.isActive('underline')}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
            >
                <Underline className="h-4 w-4" />
            </Toggle> */}

            {/* <Toggle
                size="sm"
                pressed={editor.isActive('bulletList')}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
                <UnorderedList className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('orderedList')}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <OrderedList className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('link')}
                onPressedChange={() => editor.chain().focus().unsetLink().run()}
            >
                <Link className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('image')}
                onPressedChange={() => editor.chain().focus().unsetImage().run()}
            >
                <Image className="h-4 w-4" />   
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('code')}
                onPressedChange={() => editor.chain().focus().unsetCode().run()}
            >
                <Code2 className="h-4 w-4" />
            </Toggle>
             */}
            
        </div>
    )
                
}