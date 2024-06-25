
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

import { 
    ChevronDown, 
    Menu,
    Search,
    Bell,
    Mail,
    Calendar 
} from "lucide-react"

const MainHeader = () => {
    return (
        <div className="w-full h-16 border-b p-4 flex gap-2">
            <div className="flex flex-1 items-center justify-between">
                <Menu className="w-8 h-8 p-1" />
                <div className="flex items-center gap-4">
                    <Search className="w-8 h-8 p-1" />
                    <Bell className="w-8 h-8 p-1" />
                    <Mail className="w-8 h-8 p-1" />
                    <Calendar className="w-8 h-8 p-1" />
                </div>
            </div>
            <div className="flex flex-end items-center p-2 ml-auto border-l">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center">
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/200" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col p-2 ">
                        <h2 className="font-semibold text-sm">John Doe</h2>
                        <p className="text-xs text-muted-foreground">Admin</p>
                    </div>
                    <ChevronDown className="w-8 h-8 p-2" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default MainHeader