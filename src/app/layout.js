import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SportNest | Premium Sports Facility Booking Management System",
  description: "Explore and reserve available football turfs, badminton courts, swimming lanes, or tennis courts instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#111827] text-[#F8FAFC]">
        {/* Sticky Top Navigation */}
        <Navbar />
        
        {/* Main body content. 
          pt-20 provides a static top padding buffer so the sticky navbar 
          doesn't accidentally cover up the top of your Hero section.
          flex-1 pushes the footer down.
        */}
        <main className="flex-1 flex flex-col pt-20">
          {children}
        </main>
        
        {/* Bottom Footer */}
        <Footer />

        {/* Global Toast Notification Container Layer */}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#1F2937', // matches your layout dark theme palette
              color: '#F8FAFC',
              border: '1px solid rgba(248, 250, 252, 0.1)',
            },
          }}
        />
      </body>
    </html>
  );
}