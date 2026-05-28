"use client";

import Image from "next/image";
import styles from "./EventCard.module.css";

export default function EventCard({ items }) {
  if (!items || items.length === 0) return null;

  const hasMultiple = items.length > 1;

  return (
    <div className={styles.cardContainer}>
      {/* Left Media Column */}
      <div className={styles.mediaStage}>
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`${styles.imageWrapper} ${hasMultiple ? styles.splitHeight : styles.fullHeight}`}
          >
            <Image
              src={item.image}
              alt="Motorsports Event Visual Overview"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={styles.image}
              priority={idx === 0}
            />
            <div className={styles.imageOverlay} />
          </div>
        ))}
      </div>

      {/* Right Description Column */}
      <div className={styles.contentStage}>
        <div className={styles.narrativeZone}>
          {items.map((item, idx) => (
            <div key={idx} className={styles.textGroup}>
              <p className={styles.description}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
