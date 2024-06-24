export default function DashboardLayout({ children }) {
    return (
        <div className="flex w-full h-full min-h-screen">
            <div className="hidden md:flex w-72  justify-center">Sidebar</div>
            <div className="w-full flex flex-col items-center">
                <div className="w-full">Main Header</div>
                {children}  
            </div>
            
        </div>
    );
}