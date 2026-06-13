// app/layout.js
import { Inter } from "next/font/google"; // 1. Import the Inter font
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgressBar from "../components/ScrollProgressBar";
import "./globals.css";

// 2. Configure the font (subsets are required)
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Improves font loading performance
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 3. Apply the font's class name to the body element */}
      <body className={inter.className}>
        <Header />

        {/* Main page content slot injection */}
        <main style={{ minHeight: "calc(100vh - 100px)" }}>{children}</main>
        <ScrollProgressBar />
        <Footer />
      </body>
    </html>
  );
}
