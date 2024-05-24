import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-black w-vw h-svh flex flex-col items-center gap-8 p-2 md:p-4">
          <div className="bg-white text-black flex-1 w-full rounded relative">
            <div className="max-w-[700px] w-full box-border mx-auto px-4">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
