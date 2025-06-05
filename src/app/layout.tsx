import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Aside from "@/components/layout/aside";
import Main from "@/components/layout/main";
import NextAuthProvider from "@/components/providers/next-auth-provider";

export const metadata: Metadata = {
  title: "Tati Blog",
  description:
    "Tati Blog, el blog donde encontrarás todo lo que necesitas saber sobre el mundo de la programación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
    >
      <body className="antialiased text-slate-950 dark:text-white bg-slate-100 dark:bg-slate-950 flex flex-col min-h-screen overflow-auto">
        <NextAuthProvider>
          <main className="flex-grow flex flex-col">
            <Navbar />
            <div className="flex flex-1 m-2 md:m-4 lg:m-8 transform duration-300 ease-in-out">
              <Aside />
              <Main>{children}</Main>
            </div>
          </main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
