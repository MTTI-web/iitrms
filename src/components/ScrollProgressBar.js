"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Tracks route changes across Next.js layout transitions
import styles from "./ScrollProgressBar.module.css";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname(); // Listens to URL path changes

  useEffect(() => {
    const handleScroll = () => {
      const container = null;

      let scrollTop = 0;
      let scrollHeight = 0;

      // 1. Dynamically toggle tracking based on the current page context

      // Fallback for regular pages like /cars, /team, and any future standard pages
      scrollTop = window.scrollY;
      scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }

      const currentProgress = (scrollTop / scrollHeight) * 100;
      setProgress(currentProgress);
    };

    // 2. Attach using capture phase 'true' so window catches any nested element scrolling
    window.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", handleScroll);

    // Initial calculation when mounting or arriving on a new route
    handleScroll();

    // Small execution delay to catch dynamic Next.js DOM adjustments or scroll restorations
    const timeoutId = setTimeout(handleScroll, 50);

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [pathname]); // Fires cleanup and re-binding every time the user shifts routes

  // Formatted offset so the car sits exactly on the track line boundary without clipping
  const positionOffset = `calc(${progress}% - ${68 * (progress / 100)}px)`;

  return (
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: positionOffset }} />

      <div className={styles.carWrapper} style={{ left: positionOffset }}>
        <svg
          width="68"
          height="20"
          viewBox="0 0 48 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rear Wing */}
          <path d="M4 4H8V9H4V4Z" fill="#bc1c1c" />
          <path d="M2 2H10V4H2V2Z" fill="#bc1c1c" />
          {/* Main Body Aero */}
          <path
            d="M8 9C12 9 14 5 20 5H28C32 5 36 9 42 9H46L48 11H8V9Z"
            fill="#bc1c1c"
          />
          {/* Driver Helmet */}
          <circle cx="24" cy="4" r="2.5" fill="#ffffff" />
          {/* Rear Wheel */}
          <circle
            cx="12"
            cy="10"
            r="4"
            fill="#050505"
            stroke="#bc1c1c"
            strokeWidth="1.5"
          />
          {/* Front Wheel */}
          <circle
            cx="38"
            cy="10"
            r="4"
            fill="#050505"
            stroke="#bc1c1c"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}
