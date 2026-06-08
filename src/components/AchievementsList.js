"use client";

import { useRef } from "react";
import AchievementCard from "./AchievementCard";
import styles from "./AchievementsList.module.css";
import achievementsData from "../data/achievements.json";

export default function AchievementsList() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      // Approximate scroll amount: a card width (400px) + gap
      const scrollAmount =
        window.innerWidth > 768 ? 432 : window.innerWidth * 0.85;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}
