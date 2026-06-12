"use client";

import Image from "next/image";
import styles from "./AchievementCard.module.css";

export default function AchievementCard({ achievement }) {
  // Helper to extract and format the car name from the image URL
  const getCarName = (url) => {
    if (!url) return "";
    const filename = url.split("/").pop(); // e.g., "rsme23.jpeg"
    const name = filename.split(".")[0]; // e.g., "rsme23"
    return name.toUpperCase();
  };

  const carName = getCarName(achievement.image);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={achievement.image}
          alt={`${carName} Visual`}
          fill
          sizes="(max-width: 768px) 85vw, 400px"
          className={styles.image}
        />
        <div className={styles.overlay} />

        {/* Car Name overlayed on the top right */}
        {carName && <div className={styles.carBadge}>{carName}</div>}
      </div>

      <div className={styles.content}>
        {/* Render About Section if data exists */}
        {achievement.about && achievement.about.length > 0 && (
          <div className={styles.aboutSection}>
            {achievement.about.map((info, idx) => (
              <div key={idx} className={styles.aboutItem}>
                <h4 className={styles.aboutHeading}>{info.heading}</h4>
                <p className={styles.aboutDesc}>{info.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Separator if both exist */}
        {achievement.about?.length > 0 && achievement.rank?.length > 0 && (
          <div className={styles.divider} />
        )}

        {/* Render Ranks Section if data exists */}
        {achievement.rank && achievement.rank.length > 0 && (
          <div className={styles.rankSection}>
            {achievement.rank.map((rank, idx) => (
              <div key={idx} className={styles.rankItem}>
                <span className={styles.rankPosition}>{rank.position}</span>
                <span className={styles.rankDesc}>{rank.desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
