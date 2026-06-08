import "../app/globals.css";
import Header from "../components/Header";
import ScrollProgressBar from "../components/ScrollProgressBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <ScrollProgressBar />
      </body>
    </html>
  );
}
