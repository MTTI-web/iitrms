"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/cars", label: "Cars" },
  { href: "/autonomous", label: "Autonomous" },
  { href: "/", label: "Sponsors" },
  { href: "/team", label: "Team" },
  { href: "/alumini", label: "Alumni" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ── Existing scroll-tracking logic (untouched) ──────────────────────────
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

  // ── Lock body scroll while mobile menu is open ───────────────────────────
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ── Close menu on Escape key ─────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* ── Header bar ──────────────────────────────────────────────────── */}
      <header
        className={[
          styles.header,
          isScrolled ? styles.scrolled : "",
          isMenuOpen ? styles.menuOpen : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Link href="/" onClick={closeMenu}>
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

        {/* Desktop navigation */}
        <nav className={styles.navigation}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={label} href={href} className={styles.navLink}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Hamburger / close button — visible only on mobile */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* ── Full-screen mobile overlay ───────────────────────────────────── */}
      <div
        id="mobile-nav"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <nav className={styles.mobileNav}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={styles.mobileNavLink}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
