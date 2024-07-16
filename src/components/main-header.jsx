"use client"

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
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { 
    ChevronDown, 
    Menu,
    Search,
    Bell,
    Mail,
    Calendar 
} from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import axios from "axios"

const MainHeader = () => {
    const router = useRouter()
    const handleLogout = () => {
        axios.post('/api/signout')
        .then((res) => {
            //console.log(res)
            toast.success(res.data)
            router.push('/signin')
        })
        .catch((err) => {
            //console.log(err)
            toast.error(err.message)
        })
    }
    return (
        <div className="w-full h-16 border-b p-4 flex gap-2">
            <div className="flex flex-1 items-center justify-between">
                <Button variant="ghost"><Menu className="w-8 h-8 p-1" /></Button>
                
                <div className="flex items-center gap-2">
                    <Button variant="ghost"><Search className="w-8 h-8 p-1" /></Button>
                    <Button variant="ghost"><Calendar className="w-8 h-8 p-1" /></Button>
                    <Button variant="ghost"><Bell className="w-8 h-8 p-1" /></Button>
                    <Button variant="ghost"><Mail className="w-8 h-8 p-1" /></Button>
                    
                    
                </div>
            </div>
            <div className="flex flex-end items-center p-4 ml-auto border-l">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center p-2 hover:bg-muted gap-2">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/200" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="hidden md:flex flex-col items-start ">
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
                        <DropdownMenuItem 
                            onClick={handleLogout}
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger  className="flex items-center p-2 gap-2">
                                <Avatar>
                                    <AvatarImage src="https://picsum.photos/200" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="hidden md:flex flex-col items-start ">
                                    <h2 className="font-semibold text-sm">John Doe</h2>
                                    <p className="text-xs text-muted-foreground">Admin</p>
                                </div>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>

                                <NavigationMenuLink href="/">profile</NavigationMenuLink>
                                <Separator />
                                <NavigationMenuLink>Settings</NavigationMenuLink>
                                <Separator />
                                <NavigationMenuLink>Logout</NavigationMenuLink>
                                <Separator />
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu> */}
            </div>
        </div>
    )
}

export default MainHeader