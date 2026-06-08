"use client";

import Image from "next/image";
import styles from "./SponsorsGrid.module.css";
import sponsorsData from "../data/sponsors.json";

export default function SponsorsGrid() {
  if (!sponsorsData || sponsorsData.length === 0) return null;

  return (
    <div className={styles.gridContainer}>
      {sponsorsData.map((sponsor, index) => (
        <a
          key={sponsor.id || index}
          href={sponsor.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.sponsorItem}
          title={`Visit Partner`}
        >
          <Image
            src={sponsor.name}
            alt="Corporate Partner Logo"
            width={240}
            height={120}
            className={styles.logoImage}
          />
        </a>
      ))}
    </div>
  );
}