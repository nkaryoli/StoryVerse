import { FC, PropsWithChildren } from "react";
import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({subsets: ["latin"], weight: ["300", "400", "500", "700"]});

const RootLayout:FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
          {/* <main className="fixed top-[5svh] left-[26vw] right-30 bottom-[5svh] border rounded-xl shadow overflow-y-auto p-6 flex justify-center"> */}
          <main className="p-20">
            {children}
          </main>
      </body>
    </html>
  );
}

export default RootLayout;