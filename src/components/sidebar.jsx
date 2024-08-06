"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@/lib/user-contex"

import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
import { 
    LayoutDashboard,
    Settings,
    Users, 
    ShoppingCart,
    ShoppingBag,
    LineChart,
    Headphones,
    Star,
    LogOut,
    Menu,
    Network,
    UserCog,
    ReceiptIndianRupee
} from "lucide-react"


const Sidebar = () => {
    const pathname = usePathname();

    const { admin } = useUser();
    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard",
        },
        {
            label: "Products",
            icon: ShoppingBag,
            href: "/dashboard/products",
        },
        {
            label: "Categories",
            icon: Network,
            href: "/dashboard/categories", 
        },
        {
            label: "Orders",
            icon: ShoppingCart,
            href: "/dashboard/orders",
        },
        {
            label: "Customers",
            icon: Users,
            href: "/dashboard/customers",
        },
        {
            label: "Coupons",
            icon: Star,
            href: "/dashboard/coupons",
        },
        {
            label: "Admins",
            icon: UserCog,
            href: "/dashboard/admins",
        },
        {
            label: "Transactions",
            icon: ReceiptIndianRupee,
            href: "/dashboard/transactions",
        },
    ]

    const bottomRoutes = [
        {
            label: "Support",
            icon: Headphones,
            href: "/dashboard/support",
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/dashboard/settings",
        },
    ]
    return (
        <>
            <div className="w-64 hidden md:flex flex-col items-center h-full fixed inset-y-0 border">
                <Link href="/" className="flex items-center  w-full p-4 gap-2">
                    <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path> </svg>
                    <h1 className="font-bold">Acube Mart</h1>
                </Link>
                <div className=" w-full p-4 h-full flex flex-col">
                    <div className="mt-2 flex flex-col gap-1">
                        {routes.map((routes) => (
                            <Link 
                                key={routes.href} 
                                href={routes.href} 
                                className={cn("text-sm group flex p-3 w-full items-center justify-start gap-1 font-medium cursor-pointer rounded-xl hover:bg-violet-500 hover:text-white transition",
                                    pathname === routes.href ? "bg-violet-500 text-white" : "",
                                    admin?.role === "manager" && routes.href === "/dashboard/admins" ? "hidden" : ""
                                    
                                )}
                            >
                                <routes.icon className="w-8 h-8 p-1" />
                                <span>{routes.label}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-auto flex flex-col gap-1">
                        {bottomRoutes.map((routes) => (
                            <Link 
                                key={routes.href} 
                                href={routes.href} 
                                className={cn("text-sm group flex p-3 w-full items-center justify-start gap-1 font-medium cursor-pointer rounded-xl hover:bg-violet-500 hover:text-white transition",
                                    pathname === routes.href ? "bg-violet-500 text-white" : ""
                                    
                                )}
                            >
                                <routes.icon className="w-8 h-8 p-1"  />
                                <span>{routes.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-12 md:hidden flex flex-col items-center h-full fixed inset-y-0 border">
                <Link href="/" className="flex items-center  w-full p-2 hover:bg-muted ">
                    <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path> </svg>
                </Link>
                <div className=" w-full h-full p-1 flex flex-col">
                    <div className="mt-2 flex flex-col gap-1">
                        {routes.map((routes) => (
                             <TooltipProvider key={routes.href}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Link 
                                                
                                                href={routes.href} 
                                                className={cn("text-sm group flex p-1 w-full items-center justify-start gap-1 font-medium cursor-pointer rounded-xl hover:bg-violet-500 hover:text-white transition",
                                                    pathname === routes.href ? "bg-violet-500 text-white" : ""
                                                    
                                                )}
                                            >
                                                <routes.icon className="w-8 h-8 p-1" />
                                            
                                                        
                                                    
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>{routes.label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                        ))}
                    </div>
                    <div className="mt-auto flex flex-col gap-1">
                        {bottomRoutes.map((routes) => (
                            <TooltipProvider key={routes.href}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link 
                                            href={routes.href} 
                                            className={cn("text-sm group flex p-1 w-full items-center justify-start gap-1 font-medium cursor-pointer rounded-xl hover:bg-violet-500 hover:text-white transition",
                                                pathname === routes.href ? "bg-violet-500 text-white" : ""
                                                
                                            )}
                                        >
                                            <routes.icon className="w-8 h-8 p-1"  />
                                            
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>{routes.label}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar