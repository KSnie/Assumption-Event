import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/app/components/Navigation";
import { AuthProvider } from "./Providers";
import { EdgeStoreProvider } from "../lib/edgestore";  // Import the EdgeStoreProvider

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Assumption Events",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <EdgeStoreProvider> {/* Wrap the children with EdgeStoreProvider */}
            <Nav />
            {children}
          </EdgeStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
