import Link from "next/link";
import styles from "./Autonomous.module.css";

export default function Autonomous() {
  const eventsData = [
    {
      title: "SynapseDrive - 25",
      type: "15 Day Hackathon",
      date: "Dec 13 - Dec 28",
      description:
        "Participate for an exciting experience! Top performers will get access to direct interviews during club recruitments.",
      links: [
        {
          type: "website",
          url: "https://synapsedrivecountdown.framer.website/",
        },
      ],
    },
    {
      title: "ERROR 404: Human Driver not Found!",
      type: "Hands-on Workshop",
      date: "5 Nov",
      time: "4:15PM",
      location: "APJ-205",
      description:
        "A hands on workshop designed just right for 1st year students",
      links: [
        {
          type: "github",
          url: "https://github.com/DSGxRMS/Autonomous_Workshop_I",
        },
        {
          type: "github",
          url: "https://github.com/DSGxRMS/Autonomous_Workshop_II",
        },
      ],
    },
  ];

  const verticalsData = [
    {
      name: "Perception & SLAM",
      description:
        "Perception forms the core of our autonomous system, catering to LiDAR and Camera Inputs. SLAM is the brain of the car. This is where all the thinking happens.",
    },
    {
      name: "Path Planning and Controls",
      description:
        "This is where it all comes into play. From managing controllers to commands, this is how the car drives.",
    },
  ];

  const featuresData = [
    {
      icon: "⏱",
      title: "Real-Time Data",
      description: "Instant insights for faster decision-making.",
    },
    {
      icon: "👁",
      title: "Vision Capabilities",
      description: "AI-powered image and video recognition.",
    },
    {
      icon: "❖",
      title: "Optimized Algorithms",
      description: "Smart systems capable of making split second decisions.",
    },
    {
      icon: "➦",
      title: "Actuator Controls",
      description:
        "Links it all to the sensors and actuators transforming code to motion.",
    },
  ];

  return (
    <main className={styles.mainContainer}>
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Racing, Reimagined</h1>
          <p className={styles.heroSubtext}>
            The Autonomous Formula Student Team, IIT Roorkee
          </p>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section className={styles.aboutSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeaderWrapper}>
            <h2 className={styles.sectionHeader}>About</h2>
          </div>
          <p className={styles.aboutText}>
            Born in 2025 as a collaborative venture with the IIT Roorkee
            Motorsports Team and the Data Science Group, the division was
            established to expand our reach across all domains. With full rigour
            and preparations, we target the upcoming Formula Student AI
            competition, held at the Silverstone Circuit during the FSUK event.
          </p>
        </div>
      </section>

      {/* 5. FEATURES SECTION (Extracted from Screenshot) */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeaderWrapper}>
          <h2 className={styles.sectionHeader}>Features</h2>
        </div>
        <div className={styles.featuresGrid}>
          {featuresData.map((feature, idx) => (
            <div key={idx} className={styles.featureColumn}>
              <div className={styles.featureHeader}>
                <span className={styles.featureIcon}>{feature.icon}</span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
              </div>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VERTICALS SECTION (CSS Grid Gallery) */}
      <section className={styles.gridSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeaderWrapper}>
            <h2 className={styles.sectionHeader}>Core Verticals</h2>
          </div>
          <div className={styles.verticalsGrid}>
            {verticalsData.map((vertical, idx) => (
              <div key={idx} className={styles.verticalCard}>
                <div className={styles.cardCornerAccent}></div>
                <span className={styles.cardNumber}>0{idx + 1}</span>
                <h3 className={styles.cardTitle}>{vertical.name}</h3>
                <p className={styles.cardDescription}>{vertical.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EVENTS SECTION (CSS Grid Gallery) */}
      <section
        className={styles.gridSection}
        style={{ backgroundColor: "#000000" }}
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeaderWrapper}>
            <h2 className={styles.sectionHeader}>Events</h2>
          </div>
          <div className={styles.eventsGrid}>
            {eventsData.map((event, idx) => (
              <div key={idx} className={styles.eventCard}>
                <div className={styles.eventMeta}>
                  <span className={styles.eventTypeTag}>{event.type}</span>
                  <span className={styles.eventDateTag}>
                    {event.date} {event.time ? `• ${event.time}` : ""}
                  </span>
                </div>
                <h3 className={styles.eventCardTitle}>{event.title}</h3>
                {event.location && (
                  <div className={styles.eventLocation}>
                    <span>📍</span> {event.location}
                  </div>
                )}
                <p className={styles.cardDescription}>{event.description}</p>
                <div className={styles.linkContainer}>
                  {event.links.map((link, lIdx) => (
                    <Link
                      key={lIdx}
                      href={link.url}
                      target="_blank"
                      className={styles.actionLink}
                    >
                      View{" "}
                      {link.type === "github" ? "GitHub Repository" : "Website"}{" "}
                      <span>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
