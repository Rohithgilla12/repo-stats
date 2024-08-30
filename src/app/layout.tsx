import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import Script from "next/script";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Repo Stats",
  description: "GitHub repository statistics analyzer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto py-6">{children}</main>
            <footer className="border-t py-4 text-center bg-background sticky bottom-0">
              <p>
                Created by{" "}
                <Link
                  href="https://github.com/Rohithgilla12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-primary"
                >
                  Rohith Gilla
                </Link>
              </p>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
        <Script id="microsoft-clarity-analytics">
          {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "nvg48rkzuo");
          `}
        </Script>
      </body>
    </html>
  );
}
