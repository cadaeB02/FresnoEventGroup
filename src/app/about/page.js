import Link from 'next/link';
import styles from './about.module.css';

export const metadata = {
  title: 'About Us',
  description: 'Meet Team FEG. Since 2009, Fresno Event Group has been creating unforgettable events throughout the Central Valley with personalized planning and design.',
};

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="label">Our Story</span>
          <h1 className={`display ${styles.heroTitle}`}>
            The Best &amp; Brightest
          </h1>
          <p className={styles.heroSubtitle}>
            Creating unforgettable events since 2009
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className={`section ${styles.story}`}>
        <div className="container container--narrow">
          <div className={styles.storyContent}>
            <span className="label">Welcome to Fresno Event Group</span>
            <h2 className={`display ${styles.storyHeading}`}>
              Event Planning and Design Is Our Passion
            </h2>
            <p>
              At Fresno Event Group, your personal celebrations and events come first.
              We want to learn all about your event needs, your vision, your traditions
              and everything in between! Our goal is to provide you with a customized
              plan to help you create the perfect event.
            </p>
            <p>
              We design, coordinate and execute all styles of design. Basically we make
              your life easier, smoother and more enjoyable for your special day.
            </p>
            <p>
              Team FEG is versed in both small intimate gatherings as well as large
              corporate events with over 3,000 guests. Whether it be a wedding, non-profit
              or social/corporate event we will be there each and every step of the way
              taking the lead to deliver a seamless production.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`section section--alt ${styles.team}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="label">Team FEG</span>
            <h2 className={`display ${styles.sectionHeading}`}>
              Meet Our Team
            </h2>
            <p className={styles.sectionSubtext}>
              Fresno Event Group began in 2009 and we have been on this crazy ride since.
              From our beginnings in non-profit organizations over 20 years ago, we have
              mastered the logistics, coordination details and all the ins and outs of
              event planning and design for our clients.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {/* Barbara */}
            <div className={styles.teamMember}>
              <div className={styles.memberImage}>
                <img
                  src="/barb_enhanced.png"
                  alt="Barbara Tanimoto, Founder of Fresno Event Group"
                  loading="lazy"
                />
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>Barbara Tanimoto</h3>
                <span className={styles.memberRole}>Founder</span>
                <p className={styles.memberBio}>
                  Barbara began FEG after spending 20 years in the non-profit sector.
                  From galas to golf tournaments she has produced many types of events
                  and has delivered unforgettable results. Her calm demeanor and attention
                  to detail connects her with clients to make them feel confident when
                  planning their event. She has a fun loving attitude towards the event
                  planning process and she strives endlessly to make sure her clients&apos;
                  vision is executed flawlessly. Barbara&apos;s passion is to help her
                  clients celebrate their most memorable events ever!
                </p>
              </div>
            </div>

            {/* Cindy */}
            <div className={`${styles.teamMember} ${styles.teamMemberReverse}`}>
              <div className={styles.memberImage}>
                <img
                  src="/cindy_enhanced.png"
                  alt="Cindy Bergthold, Co-Founder of Fresno Event Group"
                  loading="lazy"
                />
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>Cindy Bergthold</h3>
                <span className={styles.memberRole}>Co-Founder</span>
                <p className={styles.memberBio}>
                  Cindy co-founded FEG with Barbara in 2009. She is a jack of all trades
                  kind of gal. From creating custom floor plans to tailoring your decor needs,
                  she strives to make sure that each client truly enjoys their special day.
                  Her creative and fun mindset has created many opportunities in her event
                  planning career to become innovative in the design process. She will make
                  you laugh with her free spirited attitude but will also work tirelessly to
                  ensure exceptional results.
                </p>
              </div>
            </div>

            {/* Nicole */}
            <div className={styles.teamMember}>
              <div className={styles.memberImage}>
                <img
                  src="/nicole_enhanced.png"
                  alt="Nicole Tanimoto, Event Coordinator at Fresno Event Group"
                  loading="lazy"
                />
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>Nicole Tanimoto</h3>
                <span className={styles.memberRole}>Event Coordinator</span>
                <p className={styles.memberBio}>
                  Nicole is Barbara&apos;s daughter and has been a wonderful asset to FEG.
                  She began working for FEG in 2010 and holds a B.S. in Marketing from
                  Fresno State. She offers a fresh perspective for her clients and is
                  constantly seeking new trends in the event market. Her creative and
                  upbeat attitude has given her clients confidence to ensure them the most
                  successful event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.cta}`}>
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <span className="label">Work With Us</span>
          <h2 className={`display ${styles.ctaHeading}`}>
            Ready to Start Planning?
          </h2>
          <p className={styles.ctaText}>
            Our one-on-one consultation meetings will put your mind at ease
            with stress-free event planning.
          </p>
          <Link href="/contact" className="btn btn--primary btn--large">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
