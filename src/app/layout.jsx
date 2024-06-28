import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Acube Mart",
  description: "Acube Mart Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        
      </body>
    </html>
  );
}
