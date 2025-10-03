import { FC, PropsWithChildren } from "react";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Header } from "@/components/header-with-search";


const roboto = Roboto({subsets: ["latin"], weight: ["300", "400", "500", "700"]});

const RootLayout:FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <Header />
        <main className="w-full max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;