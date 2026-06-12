"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./CarsDisplay.module.css";

export default function CarsDisplay({ cars }) {
  const carEntries = Object.entries(cars).sort(
    (a, b) => parseInt(a[1].id) - parseInt(b[1].id),
  );
  const [activeId, setActiveId] = useState("");
  const [expandedSpecs, setExpandedSpecs] = useState({});
  const [hideSidebar, setHideSidebar] = useState(false); // Track footer visibility

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id.replace("car-", ""));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    carEntries.forEach(([_, carData]) => {
      const el = document.getElementById(`car-${carData.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [carEntries]);

  // --- FOOTER DETECTION OBSERVER ---
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHideSidebar(entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0, // Triggers immediately when the top of the footer enters the viewport
      },
    );

    footerObserver.observe(footer);
    return () => footerObserver.disconnect();
  }, []);

  const scrollToCar = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(`car-${targetId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleSpecs = (id) => {
    setExpandedSpecs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={styles.layoutContainer}>
      {/* LEFT COLUMN: Fixed Navigation Sidebar with Hide Override */}
      <aside
        className={`${styles.sidebar} ${hideSidebar ? styles.sidebarHidden : ""}`}
      >
        <h2 className={styles.sidebarTitle}>Our Fleet</h2>
        <nav className={styles.navMenu}>
          {carEntries.map(([carName, carData]) => (
            <a
              key={`nav-${carData.id}`}
              href={`#car-${carData.id}`}
              onClick={(e) => scrollToCar(e, carData.id)}
              className={`${styles.navLink} ${activeId === carData.id ? styles.active : ""}`}
            >
              {carName}
            </a>
          ))}
        </nav>
      </aside>

      {/* RIGHT COLUMN: Main scrolling content */}
      <div className={styles.contentArea}>
        {carEntries.map(([carName, carData]) => {
          const specs = carData.technicalspecifications || [];
          const isExpanded = expandedSpecs[carData.id];
          const visibleSpecs = isExpanded ? specs : specs.slice(0, 5);
          const hasMoreSpecs = specs.length > 5;

          return (
            <section
              key={carData.id}
              id={`car-${carData.id}`}
              className={styles.carSection}
            >
              {/* TOP BLOCK: Image and description */}
              <div className={styles.topBlock}>
                <div className={styles.imageStage}>
                  <Image
                    src={carData.image}
                    alt={`${carName} Fleet Overview`}
                    fill
                    className={styles.carImage}
                    sizes="(max-width: 960px) 100vw, 55vw"
                    priority={carData.id === "0"}
                  />
                  <div className={styles.fadeMask}></div>
                </div>

                <div className={styles.descStage}>
                  <h1 className={styles.carHeading}>{carName}</h1>
                  <p className={styles.carDesc}>{carData.desc}</p>
                </div>
              </div>

              {/* BOTTOM BLOCK: Achievements & Specifications */}
              <div className={styles.bottomBlock}>
                <div className={styles.infoColumn}>
                  <h3 className={styles.blockTitle}>Achievements</h3>
                  {carData.achievements && carData.achievements.length > 0 ? (
                    <ul className={styles.bulletList}>
                      {carData.achievements.map((ach, idx) => (
                        <li key={idx} className={styles.bulletItem}>
                          {ach}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.noData}>
                      No recorded achievements for this model.
                    </p>
                  )}
                </div>

                <div className={styles.infoColumn}>
                  <h3 className={styles.blockTitle}>
                    Technical Specifications
                  </h3>
                  {specs.length > 0 ? (
                    <>
                      <ul className={styles.bulletList}>
                        {visibleSpecs.map((spec, idx) => (
                          <li key={idx} className={styles.bulletItem}>
                            {spec}
                          </li>
                        ))}
                      </ul>

                      {hasMoreSpecs && (
                        <button
                          className={styles.readMoreBtn}
                          onClick={() => toggleSpecs(carData.id)}
                        >
                          {isExpanded ? (
                            <>
                              Read Less
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="18 15 12 9 6 15"></polyline>
                              </svg>
                            </>
                          ) : (
                            <>
                              View All {specs.length} Specs
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </>
                          )}
                        </button>
                      )}
                    </>
                  ) : (
                    <p className={styles.noData}>
                      Technical specifications unavailable.
                    </p>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
