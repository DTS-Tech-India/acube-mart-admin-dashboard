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
    Heading3,
    Link,
    Code2,
    SeparatorHorizontalIcon,
    Quote,
    List,
    AlignCenter,
    AlignLeft,
    AlignRight,
    Highlighter,
    Code
} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"


export default function Toolbar({ editor }) {
    if (!editor) {
        return null
    }

    const options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            preesed: editor.isActive("heading", { level: 1 }),
          },
          {
            icon: <Heading2 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            preesed: editor.isActive("heading", { level: 2 }),
          },
          {
            icon: <Heading3 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            preesed: editor.isActive("heading", { level: 3 }),
          },
          {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            preesed: editor.isActive("bold"),
          },
          {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            preesed: editor.isActive("italic"),
          },
          {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            preesed: editor.isActive("strike"),
          },
          {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            preesed: editor.isActive({ textAlign: "left" }),
          },
          {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            preesed: editor.isActive({ textAlign: "center" }),
          },
          {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            preesed: editor.isActive({ textAlign: "right" }),
          },
          {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            preesed: editor.isActive("highlight"),
          },
          {
            icon: <Code className="size-4" />,
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            preesed: editor.isActive("code"),
          },
          {
            icon: <Quote className="size-4" />,
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            preesed: editor.isActive("blockquote"),
          },
          /* {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            preesed: editor.isActive("bulletList"),
          },
          {
            icon: <OrderedList className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            preesed: editor.isActive("orderedList"),
          },
          
           */
    ]

    return (
        <div className="flex items-center gap-1 border border-input bg-transparent rounded-md">
            {options.map((option, i) => (
                <Toggle
                    key={i}
                    size="sm"
                    pressed={option.preesed}
                    onPressedChange={option.onClick}
                >
                    {option.icon}
                </Toggle>
            ))}
        </div>
    )
                
}