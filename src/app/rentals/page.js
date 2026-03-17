import Link from 'next/link';
import styles from './rentals.module.css';

export const metadata = {
  title: 'Rentals',
  description: 'Browse Fresno Event Group\'s 3,000 sq ft warehouse of unique event decor rentals including candelabras, vases, lanterns, chandeliers, and custom props.',
};

const rentalCategories = [
  {
    title: 'Accessories & Props',
    slug: 'accessories-and-props',
    description: 'The finishing touches that tie everything together. Ring pillows, flower girl baskets, table numbers, and more.',
    count: '7 pages',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    title: 'Custom Prop Fabrications',
    slug: 'custom-props',
    description: 'If you can dream it, we can build it. Custom backdrops, photo booth props, themed decorations, and unique installations.',
    count: '2 pages',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    title: 'Lanterns, Lamps & Chandeliers',
    slug: 'lanterns-lamps-and-chandeliers',
    description: 'Statement lighting pieces that transform any venue. Vintage lanterns, crystal chandeliers, and everything in between.',
    count: '2 pages',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18h6M10 22h4M12 2v3"/>
        <path d="M12 5a6 6 0 0 1 6 6c0 3-2 5-3 6H9c-1-1-3-3-3-6a6 6 0 0 1 6-6z"/>
      </svg>
    ),
  },
  {
    title: 'Candelabras',
    slug: 'candelabras',
    description: 'Elegant candelabras in various styles, from classic crystal to rustic iron, perfect for adding ambiance to any event.',
    count: '1 page',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v8M8 6v4M16 6v4M4 10h16M6 10v10c0 1 2 2 6 2s6-1 6-2V10"/>
        <circle cx="8" cy="4" r="1.5"/><circle cx="12" cy="1" r="1"/><circle cx="16" cy="4" r="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Cake Stands & Service Ware',
    slug: 'cake-stands-and-service-ware',
    description: 'Beautiful cake stands and dessert displays that make your confections the centerpiece of the celebration.',
    count: '2 pages',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="14" width="18" height="2" rx="1"/>
        <rect x="7" y="8" width="10" height="6" rx="1"/>
        <path d="M10 14v4M14 14v4M8 18h8"/>
      </svg>
    ),
  },
  {
    title: 'Vases',
    slug: 'vases',
    description: 'From tall cylinder vases to mercury glass and vintage compotes, we have the perfect vessel for your floral arrangements.',
    count: '3 pages',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 2h6M10 2v3c0 2-3 4-3 8v7c0 1.5 2 2 5 2s5-.5 5-2v-7c0-4-3-6-3-8V2"/>
      </svg>
    ),
  },
  {
    title: 'Candle Holders & Votives',
    slug: 'candle-holders-and-votives',
    description: 'Set the mood with our collection of candle holders and votives in glass, metal, and mercury finishes.',
    count: '4 pages',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a3 3 0 0 1 3 3v2H9V5a3 3 0 0 1 3-3zM9 7h6v10c0 1.5-1.5 3-3 3s-3-1.5-3-3V7z"/>
        <path d="M12 4v1"/>
      </svg>
    ),
  },
  {
    title: 'Trees, Twigs & Topiaries',
    slug: 'trees-twigs-and-topiaries',
    description: 'Natural elements to bring the outdoors into your event. Manzanita branches, topiaries, birch poles, and more.',
    count: '2 pages',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22V8M12 8L8 12M12 8l4 4"/>
        <path d="M12 2a5 5 0 0 1 5 5H7a5 5 0 0 1 5-5z"/>
      </svg>
    ),
  },
];

export default function Rentals() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="label">Decor Rentals</span>
          <h1 className={`display ${styles.heroTitle}`}>
            3,000 Sq. Ft. of Unique Decor
          </h1>
          <p className={styles.heroSubtitle}>
            An extensive warehouse filled with distinctive and customized inventory
            to make your event truly one of a kind.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className={`section ${styles.intro}`}>
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <h2 className={`display ${styles.introHeading}`}>
            If You Can Dream It, We Can Find or Create It
          </h2>
          <p className={styles.introText}>
            We do more than just coordinate events - we have TONS of unique and fun decor
            items too! We have over 3,000 sq ft. of warehouse that you can come visit and
            see for yourself. Don&apos;t see something we have? No worries, Cindy and her
            excellent resourceful tools can help you find or create the items you are
            looking for.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className={`section section--alt ${styles.categories}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="label">Browse Our Collection</span>
            <h2 className={`display ${styles.sectionHeading}`}>Rental Categories</h2>
          </div>
          <div className={styles.categoryGrid}>
            {rentalCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/rentals/${cat.slug}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryIcon}>{cat.icon}</div>
                <h3 className={styles.categoryTitle}>{cat.title}</h3>
                <p className={styles.categoryDesc}>{cat.description}</p>
                <span className={styles.categoryLink}>
                  View Catalog <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`section ${styles.process}`}>
        <div className="container container--narrow">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <span className="label">How It Works</span>
            <h2 className={`display ${styles.processHeading}`}>
              Renting Is Easy
            </h2>
          </div>
          <div className={styles.processSteps}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>01</span>
              <h3 className={styles.stepTitle}>Consultation</h3>
              <p className={styles.stepDesc}>
                Schedule a one-on-one meeting to discuss your event vision, theme, and decor needs.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>02</span>
              <h3 className={styles.stepTitle}>Warehouse Visit</h3>
              <p className={styles.stepDesc}>
                Tour our 3,000 sq ft warehouse and hand-pick the items that speak to your vision.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>03</span>
              <h3 className={styles.stepTitle}>Delivery and Setup</h3>
              <p className={styles.stepDesc}>
                We deliver, set up, and collect after your event. You just enjoy the celebration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section section--dark`}>
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <span className="label" style={{ color: 'var(--color-accent-light)' }}>Ready to Browse?</span>
          <h2 className={`display ${styles.ctaHeading}`}>
            Schedule a Warehouse Tour
          </h2>
          <p className={styles.ctaText}>
            The best way to see our collection is in person. Contact us to schedule
            a private tour of our rental warehouse.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn--primary btn--large">
              Schedule a Visit
            </Link>
            <a href="tel:5597098603" className="btn btn--outline btn--large" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)' }}>
              Call 559.709.8603
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
