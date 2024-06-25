import Sidebar from "@/components/sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex w-full h-full min-h-screen">
            <Sidebar />
            <div className="ml-12 md:ml-64 w-full flex flex-col items-center">
                <div className="w-full">Main Header</div>
                {children}  
            </div>
            
        </div>
    );
}