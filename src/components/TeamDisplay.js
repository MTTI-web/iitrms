"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./TeamDisplay.module.css";

// Helper to convert names to URL-safe IDs (e.g., "Faculty Advisors" -> "faculty-advisors")
const createSafeId = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function TeamDisplay({ team }) {
  const departments = team ? Object.keys(team) : [];

  const [activeDept, setActiveDept] = useState(
    departments[0] ? createSafeId(departments[0]) : "",
  );

  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const navMenuRef = useRef(null);

  // EFFECT 1: Tracks current section for active navigation states
  useEffect(() => {
    if (departments.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Adjusted slightly for better mobile triggering
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveDept(entry.target.id.replace("dept-", ""));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    departments.forEach((dept) => {
      const el = document.getElementById(`dept-${createSafeId(dept)}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [departments]);

  // EFFECT 2: Detects page bottom approaches and directional scroll shifts
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const distanceFromBottom = scrollHeight - clientHeight - currentScrollY;
      const bottomThreshold = 650;

      if (distanceFromBottom < bottomThreshold) {
        if (currentScrollY < lastScrollY) {
          setIsSidebarHidden(false);
        } else {
          setIsSidebarHidden(true);
        }
      } else {
        setIsSidebarHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // EFFECT 3: Auto-scroll the mobile horizontal nav to keep the active item visible
  useEffect(() => {
    if (window.innerWidth <= 768 && navMenuRef.current) {
      const activeElement = navMenuRef.current.querySelector(
        `.${styles.active}`,
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [activeDept]);

  const scrollToDept = (e, deptName) => {
    e.preventDefault();
    const element = document.getElementById(`dept-${createSafeId(deptName)}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderSocialIcon = (platform) => {
    const icons = {
      linkedin: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
      facebook: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
        </svg>
      ),
      email: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      website: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
    };
    return icons[platform.toLowerCase()] || null;
  };

  if (departments.length === 0) {
    return (
      <div
        className={styles.emptyNotice}
        style={{ margin: "100px", textAlign: "center" }}
      >
        <p>
          No valid team classifications found in your data registry source file.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.layoutContainer}>
      <style>{`
        .${styles.socialBar} {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          margin-top: 8px !important;
        }
        .${styles.socialLink} {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 16px !important;
          height: 16px !important;
          opacity: 0.75 !important;
          color: #ffffff !important;
          transition: opacity 0.2s ease !important;
          transform: none !important;
        }
        .${styles.socialLink}:hover {
          opacity: 1.0 !important;
          transform: none !important;
        }
        .${styles.socialLink} svg {
          width: 16px !important;
          height: 16px !important;
          display: block !important;
        }
      `}</style>

      {/* FIXED SIDEBAR PINNED WITH CONDITIONAL TRANSITION HOOK */}
      <aside
        className={`${styles.sidebar} ${isSidebarHidden ? styles.sidebarHidden : ""}`}
      >
        <h2 className={styles.sidebarTitle}>The Team</h2>
        <nav className={styles.navMenu} ref={navMenuRef}>
          {departments.map((dept) => {
            const safeId = createSafeId(dept);
            return (
              <a
                key={`nav-${safeId}`}
                href={`#dept-${safeId}`}
                onClick={(e) => scrollToDept(e, dept)}
                className={`${styles.navLink} ${activeDept === safeId ? styles.active : ""}`}
              >
                {dept}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* NATURAL SCROLL CONTENT AREA */}
      <div className={styles.contentArea}>
        {departments.map((dept) => {
          const members = team[dept] || [];
          const safeId = createSafeId(dept);
          const isFacultyDept = dept === "Faculty Advisors";

          return (
            <section
              key={safeId}
              id={`dept-${safeId}`}
              className={styles.deptSection}
            >
              <h1 className={styles.deptHeading}>{dept}</h1>

              <div className={styles.membersGrid}>
                {members.map((member, index) => {
                  const name = member.name || "Unknown Member";

                  let role = "Team Member";
                  if (member.subsystem) {
                    role =
                      member.post &&
                      member.post !== "Member" &&
                      member.post !== ""
                        ? `${member.subsystem} (${member.post})`
                        : member.subsystem;
                  } else if (isFacultyDept) {
                    role = "Faculty Advisor";
                  } else if (member.post && member.post !== "Member") {
                    role = member.post;
                  }

                  let imageSrc = null;
                  const rawPhotoLink = member.image;
                  const hasValidImage =
                    rawPhotoLink && rawPhotoLink.trim() !== "";

                  if (hasValidImage) {
                    const cleanLink = rawPhotoLink.trim();
                    if (
                      cleanLink.startsWith("/") ||
                      cleanLink.startsWith("http")
                    ) {
                      imageSrc = cleanLink;
                    } else {
                      imageSrc =
                        (member.Timestamp ? "/team/new/" : "/team/old/") +
                        cleanLink;
                    }
                  }

                  const imageStyle =
                    isFacultyDept || member.Timestamp
                      ? { objectFit: "cover", objectPosition: "50% 30%" }
                      : {
                          objectFit: "cover",
                          objectPosition: "70% 50%",
                          transform: "rotate(-90deg) scale(1.25)",
                          transformOrigin: "center",
                        };

                  const socials = {};
                  if (member.linkedin?.trim()) {
                    let ln = member.linkedin.trim();
                    socials.linkedin = ln.startsWith("http")
                      ? ln
                      : `https://${ln}`;
                  }
                  if (member.email?.trim()) {
                    socials.email = `mailto:${member.email.trim()}`;
                  }
                  if (member["Faculty Profile"]?.trim()) {
                    socials.website = member["Faculty Profile"].trim();
                  }
                  if (member.facebook?.trim()) {
                    socials.facebook = member.facebook.trim();
                  }

                  return (
                    <div key={index} className={styles.memberCard}>
                      <div
                        className={styles.avatarStage}
                        style={
                          !hasValidImage
                            ? {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "rgba(255,255,255,0.02)",
                              }
                            : {}
                        }
                      >
                        {hasValidImage ? (
                          <Image
                            src={imageSrc}
                            alt={`${name} Profile`}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                            className={styles.avatarImage}
                            style={imageStyle}
                            priority={index < 4}
                          />
                        ) : (
                          <svg
                            viewBox="0 0 100 100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              width: "65%",
                              height: "65%",
                              opacity: 0.25,
                              color: "var(--foreground, #ffffff)",
                            }}
                          >
                            <path d="M 76,78 C 87,75 92,54 87,40 C 83,28 72,18 54,18 C 36,18 25,26 22,38 L 31,41 L 29,56 L 14,58 C 11,68 16,78 28,78 Z" />
                            <path
                              d="M 28,78 L 76,78 C 76,78 72,73 66,73 L 34,73 Z"
                              fill="currentColor"
                              fillOpacity="0.1"
                            />
                            <path
                              d="M 22,38 C 11,43 11,52 29,56 Z"
                              fill="currentColor"
                              fillOpacity="0.2"
                            />
                            <circle cx="44" cy="48" r="3" fill="currentColor" />
                            <circle cx="44" cy="48" r="5" strokeWidth="1" />
                            <line
                              x1="20"
                              y1="65"
                              x2="25"
                              y2="65"
                              strokeWidth="2"
                            />
                            <line
                              x1="22"
                              y1="70"
                              x2="27"
                              y2="70"
                              strokeWidth="2"
                            />
                            <path
                              d="M 48,22 C 56,20 64,22 68,25"
                              strokeWidth="1.5"
                              strokeDasharray="3 2"
                            />
                          </svg>
                        )}
                        <div className={styles.cardOverlay}></div>
                      </div>

                      <div className={styles.metaZone}>
                        <h3 className={styles.memberName}>{name}</h3>
                        <p className={styles.memberRole}>{role}</p>

                        {Object.keys(socials).length > 0 && (
                          <div className={styles.socialBar}>
                            {Object.entries(socials).map(([platform, url]) => (
                              <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label={platform}
                              >
                                {renderSocialIcon(platform)}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
