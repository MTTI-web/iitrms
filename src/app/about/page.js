import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
  return (
    <main className={styles.mainContainer}>
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/group_photo.png" // Replace with your actual group photo path
            alt="IIT Roorkee Motorsports Team"
            fill
            sizes="100vw"
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroTitleContainer}>
          <h1 className={styles.heroTitle}>ABOUT US</h1>
          <div className={styles.titleAccent}></div>
        </div>
      </section>

      {/* ABOUT US TEXT NARRATIVE */}
      <section className={styles.textSection}>
        <div className={styles.contentContainer}>
          <p className={styles.description}>
            The official Formula Student Electric team of IIT Roorkee which
            participates in the world&apos;s largest Inter-Collegiate
            Engineering competition conducted by the IMechE and SAE (Formula
            Student and FSAE, respectively) by designing, fabricating an
            open-wheel formula-style electric race car.
          </p>
          <p className={styles.description}>
            With a burning passion for Engineering Design, a handful of racing
            enthusiasts came together and started the team&apos;s journey in
            2010. The team made its debut in 2011 by participating in FSAE
            Australasia held in Melbourne, Australia, with an internal
            combustion engine car. Since then, the team has participated in
            Formula Student competitions every alternate year - Formula Student
            UK - 2013 with a Hybrid Car, FSAE Australasia in 2015 with our first
            fully Electric car, Formula Green in 2017, Formula Green 2020 at
            Coimbatore, and Formula Bharat 2020, which was conducted remotely
            due to the pandemic. The Team is now aiming to participate in
            Formula Bharat, 2023, to be held in Coimbatore.
          </p>
          <p className={styles.description}>
            Led by three faculty advisors, the team has now evolved into a group
            of more than 50 members comprising not only Mechanical and
            Electrical divisions but also a Media division, working tirelessly
            to present our work to the world, and a Marketing division,
            responsible for bringing in sponsors - the financial backbone of the
            team.
          </p>
        </div>
      </section>

      {/* ABOUT FORMULA BHARAT SPLIT GRID */}
      <section className={styles.splitSection}>
        <div className={styles.splitMedia}>
          <Image
            src="/fb.png" // Replace with your actual track photo path
            alt="Formula Bharat Competition"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={styles.image}
          />
          <div className={styles.imageOverlay} />
        </div>
        <div className={styles.splitContent}>
          <h2 className={styles.sectionHeading}>ABOUT FORMULA BHARAT</h2>
          <p className={styles.description}>
            Formula Student is a student design competition organized by the
            Institution of Mechanical Engineers (IMechE). It is the world&apos;s
            largest student engineering design competition which enables
            students with the unique opportunity to develop their skills in
            technical designing, manufacturing, research work, team management,
            communication, and business operations such as budgeting and market
            research in a real-world environment.
          </p>
          <p className={styles.description}>
            In a Formula Student competition, a team and their car are evaluated
            through Static and Dynamic events.
          </p>
        </div>
      </section>

      {/* NOTION STYLE EVENTS TABLE */}
      <section className={styles.eventsTextSection}>
        <div className={styles.eventsTable}>
          {/* Static Events Column */}
          <div className={styles.eventColumn}>
            <h3 className={styles.eventHeading}>Static Events</h3>
            <p className={styles.description}>
              The Static events consist of Design, Cost, and Business
              presentations that enable participants to showcase their vehicle
              design and testing, budget allocation, and marketing strategy
              know-how.
            </p>
          </div>

          {/* Dynamic Events Column */}
          <div className={styles.eventColumn}>
            <h3 className={styles.eventHeading}>Dynamic Events</h3>
            <p className={styles.description}>
              The Dynamic events consist of Skid-pad, Acceleration, Autocross,
              Efficiency, and Endurance tests. These provide the judges an
              opportunity to put the teams&apos; cars to the ultimate test and
              make them compete with each other in a 22 km track race.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
