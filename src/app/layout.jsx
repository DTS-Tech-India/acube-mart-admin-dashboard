import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/lib/user-contex";
import { ConfirmProvider } from "@/lib/confirm-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Acube Mart",
  description: "Acube Mart Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Providers>
            <ConfirmProvider>
              {children}
              <Toaster />
            </ConfirmProvider>
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
