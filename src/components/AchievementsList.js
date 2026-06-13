"use client";

import { useRef } from "react";
import AchievementCard from "./AchievementCard";
import styles from "./AchievementsList.module.css";
import achievementsData from "../data/achievements.json";

export default function AchievementsList() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;

    // Mobile: card is 88vw + 1rem gap  →  window.innerWidth * 0.88 + 16
    // Desktop: card is capped at 400px + 2rem gap  →  432px
    // Note: scroll-snap-type will correct any minor inaccuracy automatically.
    const isMobile = window.innerWidth < 768;
    const scrollAmount = isMobile ? window.innerWidth * 0.88 + 16 : 432;

    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!achievementsData || achievementsData.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      {/* Left Navigation Button */}
      <button
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Horizontally Scrollable Track */}
      <div className={styles.listContainer} ref={scrollContainerRef}>
        {achievementsData.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {/* Right Navigation Button */}
      <button
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
