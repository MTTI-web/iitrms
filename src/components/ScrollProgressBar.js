"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollProgressBar.module.css";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = document.getElementById("main-scroll-container");
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;

      if (scrollHeight <= 0) return;

      const currentProgress = (scrollTop / scrollHeight) * 100;
      setProgress(currentProgress);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Updated to match the new 68px width of the scaled-up car
  // so it perfectly parks at the right edge without overflowing.
  const positionOffset = `calc(${progress}% - ${68 * (progress / 100)}px)`;

  return (
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: positionOffset }} />

      <div className={styles.carWrapper} style={{ left: positionOffset }}>
        {/* SVG width and height scaled up, while viewBox preserves the exact car shape */}
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
