"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById("hero-section");
    if (!heroSection) {
      setIsScrolled(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the hero section is in view, keep background completely transparent.
        // As soon as it passes out of view, turn the translucent blur on.
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0.8, // Triggers immediately as the section starts snapping away
      },
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
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
        <Link href="#" className={styles.navLink}>
          About
        </Link>
        <Link href="/cars" className={styles.navLink}>
          Cars
        </Link>
        <Link href="#" className={styles.navLink}>
          Sponsors
        </Link>
        <Link href="#" className={styles.navLink}>
          Teams
        </Link>
        <Link href="#" className={styles.navLink}>
          Alumni
        </Link>
        <Link href="#" className={styles.navLink}>
          Media
        </Link>
        <Link href="#" className={styles.navLink}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
