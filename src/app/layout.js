// app/layout.js (or your global layout wrapper)
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Ensure your Footer is imported here
import ScrollProgressBar from "../components/ScrollProgressBar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        {/* Main page content slot injection */}
        <main style={{ minHeight: "calc(100vh - 100px)" }}>{children}</main>
        <ScrollProgressBar />
        <Footer />
      </body>
    </html>
  );
}
