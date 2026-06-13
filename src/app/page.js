import EventsCarousel from "../components/EventsCarousel";
import AchievementsList from "../components/AchievementsList";
import SponsorsGrid from "../components/SponsorsGrid";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main id="main-scroll-container" className={styles.home}>
      {/* SECTION 1: HERO */}
      <section id="hero-section" className={styles.heroSection}>
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>IIT Roorkee Motorsports</h1>
          <p className={styles.subtitle}>
            Pushing Limits, Redefining Performance
          </p>
        </div>
      </section>

      {/* SECTION 2: RECENT EVENTS */}
      <section className={styles.eventsSection}>
        <div className={styles.sectionHeaderWrapper}>
          <h2 className={styles.sectionHeader}>Recent Events</h2>
        </div>
        <EventsCarousel />
      </section>

      {/* SECTION 3: ACHIEVEMENTS */}
      <section className={styles.eventsSection}>
        <div className={styles.sectionHeaderWrapper}>
          <h2 className={styles.sectionHeader}>Our Legacy</h2>
        </div>
        <AchievementsList />
      </section>

      {/* SECTION 4: SPONSORS */}
      <section className={styles.sponsorsSection} id="sponsors">
        <div className={styles.sectionHeaderWrapper}>
          <h2 className={styles.sectionHeader}>Our Partners</h2>
        </div>
        <SponsorsGrid />
      </section>
    </main>
  );
}
