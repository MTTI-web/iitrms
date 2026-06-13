"use client";

import { useState, useEffect, useRef } from "react";
import EventCard from "./EventCard";
import styles from "./EventsCarousel.module.css";
import eventsData from "../data/events.json";

export default function EventsCarousel() {
  const totalItems = eventsData.length;

  const displayItems = [
    eventsData[totalItems - 1],
    ...eventsData,
    eventsData[0],
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const jumpResetRef = useRef(false);

  // --- SWIPE GESTURE TRACKING STATE ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const handleNext = () => {
    if (jumpResetRef.current) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (jumpResetRef.current) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // --- SWIPE GESTURE INTERACTION HANDLERS ---
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    if (currentIndex === displayItems.length - 1) {
      jumpResetRef.current = true;
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
        jumpResetRef.current = false;
      }, 600);
      return () => clearTimeout(timeout);
    }

    if (currentIndex === 0) {
      jumpResetRef.current = true;
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(displayItems.length - 2);
        jumpResetRef.current = false;
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, displayItems.length]);

  return (
    <div
      className={styles.carouselWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={handlePrev}
        aria-label="Previous"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={handleNext}
        aria-label="Next"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      <div className={styles.carouselViewport}>
        <div
          className={styles.carouselTrack}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning
              ? "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
          }}
        >
          {displayItems.map((eventItems, index) => (
            <div key={index} className={styles.carouselSlide}>
              <EventCard items={eventItems} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
