import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>Fresno&apos;s Premier Event Planning Team</span>
          <h1 className={styles.heroTitle}>
            Fun. Fabulous.<br />
            <span className={styles.heroAccent}>Fresh.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Full-service event planning, design, and coordination for weddings,
            corporate events, and celebrations throughout the Central Valley.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className="btn btn--primary btn--large">
              Start Planning Your Event
            </Link>
            <Link href="/gallery" className="btn btn--white btn--large">
              View Our Work
            </Link>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>Scroll to Explore</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* Intro Section */}
      <section className={`section ${styles.intro}`}>
        <div className="container container--narrow">
          <div className={styles.introContent}>
            <span className="label">Welcome to Fresno Event Group</span>
            <h2 className={`display ${styles.introHeading}`}>
              Where Every Detail Tells Your Story
            </h2>
            <p className={styles.introText}>
              At Fresno Event Group, your personal celebrations and events come first.
              We want to learn all about your event needs, your vision, your traditions
              and everything in between! Our goal is to provide you with a customized
              plan to help you create the perfect event.
            </p>
            <p className={styles.introText}>
              We design, coordinate and execute all styles of events. From intimate
              gatherings to large corporate events with over 3,000 guests — no matter
              your size, we&apos;ve got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`section section--alt ${styles.services}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="label">What We Do</span>
            <h2 className={`display ${styles.sectionHeading}`}>
              Details. Designs. Experiences.
            </h2>
          </div>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Full Service Planning</h3>
              <p className={styles.serviceDesc}>
                The ultimate service. From venue selection to vendor management,
                we handle every detail so you can relax and enjoy your special day.
              </p>
              <Link href="/services/full-service-planning" className={styles.serviceLink}>
                Learn More <span>→</span>
              </Link>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Wedding Day Management</h3>
              <p className={styles.serviceDesc}>
                Already planned everything? We&apos;ll take the reins on the big day,
                managing vendors, timelines, and all the nitty gritty details.
              </p>
              <Link href="/services/wedding-day-management" className={styles.serviceLink}>
                Learn More <span>→</span>
              </Link>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Corporate & Social Events</h3>
              <p className={styles.serviceDesc}>
                From intimate dinner parties to lavish corporate galas, we create
                memorable experiences for every occasion.
              </p>
              <Link href="/services/corporate-events" className={styles.serviceLink}>
                Learn More <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className={`section--lg ${styles.galleryPreview}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="label">Our Portfolio</span>
            <h2 className={`display ${styles.sectionHeading}`}>
              Every Picture Tells a Story
            </h2>
          </div>
          <div className={styles.galleryGrid}>
            <div className={`${styles.galleryItem} ${styles.galleryLarge}`}>
              <img
                src="https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5a93782bec212d9451f7633c/1519613999539/289.jpg"
                alt="Elegant wedding reception with beautiful table settings"
                loading="lazy"
              />
              <div className={styles.galleryOverlay}>
                <span>Wedding Receptions</span>
              </div>
            </div>
            <div className={styles.galleryItem}>
              <img
                src="https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5a272c50e2c483cf8718269a/1512516699910/Nicki++Matt_283_w_full.jpg"
                alt="Beautiful couple at their wedding ceremony"
                loading="lazy"
              />
              <div className={styles.galleryOverlay}>
                <span>Ceremonies</span>
              </div>
            </div>
            <div className={styles.galleryItem}>
              <img
                src="https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5c3ba8244fa51afb62d1561b/1547413553563/Sneak+Peeks-0006+resize.jpg"
                alt="Event decor and design details"
                loading="lazy"
              />
              <div className={styles.galleryOverlay}>
                <span>Event Design</span>
              </div>
            </div>
            <div className={styles.galleryItem}>
              <img
                src="https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5a77790671c10bcbfb8dfc27/1611958639863/16265207_10155870498657818_9198860857523937196_n.jpg"
                alt="Festive event celebration"
                loading="lazy"
              />
              <div className={styles.galleryOverlay}>
                <span>Celebrations</span>
              </div>
            </div>
          </div>
          <div className={styles.galleryAction}>
            <Link href="/gallery" className="btn btn--outline btn--large">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Rentals Teaser */}
      <section className={`section section--dark ${styles.rentals}`}>
        <div className="container">
          <div className={styles.rentalsInner}>
            <div className={styles.rentalsContent}>
              <span className="label" style={{ color: 'var(--color-accent-light)' }}>Decor Rentals</span>
              <h2 className={`display ${styles.rentalsHeading}`}>
                3,000 Sq. Ft. of Unique Decor
              </h2>
              <p className={styles.rentalsText}>
                We have an extensive warehouse filled with distinctive and customized inventory.
                From candelabras to custom prop fabrications, if you can dream it, we can find
                or create it.
              </p>
              <div className={styles.rentalsTags}>
                <span className={styles.rentalTag}>Candelabras</span>
                <span className={styles.rentalTag}>Vases</span>
                <span className={styles.rentalTag}>Lanterns & Chandeliers</span>
                <span className={styles.rentalTag}>Cake Stands</span>
                <span className={styles.rentalTag}>Custom Props</span>
                <span className={styles.rentalTag}>Accessories</span>
              </div>
              <Link href="/rentals" className="btn btn--primary btn--large">
                Browse Rentals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Bar */}
      <section className={`${styles.stats}`}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>17+</span>
              <span className={styles.statLabel}>Years of Experience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Events Coordinated</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>3,000</span>
              <span className={styles.statLabel}>Sq. Ft. of Decor</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>3,000+</span>
              <span className={styles.statLabel}>Largest Event Guests</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className={`section ${styles.team}`}>
        <div className="container container--narrow">
          <div className={styles.sectionHeader}>
            <span className="label">Meet the Team</span>
            <h2 className={`display ${styles.sectionHeading}`}>
              The Best &amp; Brightest
            </h2>
            <p className={styles.sectionSubtext}>
              Team FEG has been creating unforgettable events since 2009. Our one-on-one
              consultations put your mind at ease with stress-free planning.
            </p>
          </div>
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <div className={styles.teamImageWrapper}>
                <img
                  src="/barb_enhanced.png"
                  alt="Barbara Tanimoto - Founder of Fresno Event Group"
                  loading="lazy"
                />
              </div>
              <h3 className={styles.teamName}>Barbara Tanimoto</h3>
              <span className={styles.teamRole}>Founder</span>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamImageWrapper}>
                <img
                  src="/cindy_enhanced.png"
                  alt="Cindy Bergthold - Co-Founder of Fresno Event Group"
                  loading="lazy"
                />
              </div>
              <h3 className={styles.teamName}>Cindy Bergthold</h3>
              <span className={styles.teamRole}>Co-Founder</span>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamImageWrapper}>
                <img
                  src="/nicole_enhanced.png"
                  alt="Nicole Tanimoto - Event Coordinator at Fresno Event Group"
                  loading="lazy"
                />
              </div>
              <h3 className={styles.teamName}>Nicole Tanimoto</h3>
              <span className={styles.teamRole}>Event Coordinator</span>
            </div>
          </div>
          <div className={styles.teamAction}>
            <Link href="/about" className="btn btn--outline btn--large">
              Learn Our Story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
