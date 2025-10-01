import { FC, PropsWithChildren } from "react";
import "./globals.css";
import { Roboto } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

const roboto = Roboto({subsets: ["latin"], weight: ["300", "400", "500", "700"]});

const RootLayout:FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="fixed top-[5svh] left-[26vw] right-30 bottom-[5svh] border rounded-xl shadow overflow-y-auto p-6 flex justify-center">
            {children}
          </main>
        </SidebarProvider>
        
      </body>
    </html>
  );
}

export default RootLayout;