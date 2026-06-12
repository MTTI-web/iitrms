"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If we are on the home page, read its scrollTop. Otherwise, fallback to window.scrollY (for /cars)
      const scrollTop = window.scrollY;

      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // 'true' activates the capture phase, enabling the window to intercept
    // scroll events triggered by deep internal components like #main-scroll-container
    window.addEventListener("scroll", handleScroll, true);

    // Check immediately on component mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="IIT Roorkee Motorsports Logo"
            width={160}
            height={50}
            className={styles.logoImage}
            priority
          />
        </Link>
      </div>

      <nav className={styles.navigation}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/cars" className={styles.navLink}>
          Cars
        </Link>
        <Link href="/autonomous" className={styles.navLink}>
          Autonomous
        </Link>
        <Link href="/" className={styles.navLink}>
          Sponsors
        </Link>
        <Link href="/team" className={styles.navLink}>
          Team
        </Link>
        <Link href="/alumini" className={styles.navLink}>
          Alumni
        </Link>
      </nav>
    </header>
  );
}
