import Link from 'next/link';
import styles from './services.module.css';

export const metadata = {
  title: 'Services',
  description: 'Fresno Event Group offers full-service event planning, wedding day management, and corporate event coordination in the Central Valley.',
};

const services = [
  {
    title: 'Full Service Planning and Design',
    slug: 'full-service-planning',
    description: 'This is the ultimate service. If you have a busy schedule and are feeling overwhelmed or frustrated with your event planning details, let us assist you so your dream wedding can become your reality. We will be there each step of the way to guide you so you can relax on the big day and be stress free.',
    image: '/images/event_farm_table.jpg',
    features: [
      'Unlimited personal face-to-face, phone and email consultations',
      'Assistance with locating and contracting ceremony and reception venues',
      'Vendor recommendations for every wedding related aspect',
      'Access to exclusive rental items',
      'Expert design process to fit your customized needs',
      'Personalized rehearsal, wedding day schedule and ceremony timelines',
      'Catering menu selection, tasting and negotiations',
      'Expert knowledge of contract review and arrangements',
      'Coordination of wedding rehearsal and rehearsal dinner',
      'All Wedding Day Management is included with Full Service',
    ],
  },
  {
    title: 'Wedding Day Management',
    slug: 'wedding-day-management',
    description: 'The day of your wedding needs to be a fun and joyous time. You can be at ease with your significant other and loved ones and have us manage all the nitty gritty details.',
    image: '/images/event_ceremony_setup.jpg',
    features: [
      'Professionally dressed Senior Event Consultant(s) and up to 3 assistants on site',
      'Oversee the set-up of the Ceremony and Reception venue',
      'Point of contact with the venue coordinator, vendors, bridal party and family',
      'Centerpiece placements for both Ceremony and Reception sites',
      'Floor plan consulting and design',
      'Customized wedding day timeline creation',
      'Supervise the transfer of gifts',
      'Arrange return of rental items',
      'Use of emergency wedding day kit',
    ],
  },
  {
    title: 'Social and Corporate Event Planning',
    slug: 'corporate-events',
    description: 'Your social soirees and corporate events are unique fun celebrations that we love to be a part of. Whether it be an intimate dinner party or a lavish corporate gala we will guide you with consultations to create the most memorable event ever.',
    image: '/images/event_paris_gala.jpg',
    features: [
      'Custom event design and theming',
      'Venue selection and coordination',
      'Vendor management and negotiations',
      'Day-of coordination and management',
      'Corporate branding integration',
      'Entertainment and program coordination',
    ],
  },
];

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="label">What We Do</span>
          <h1 className={`display ${styles.heroTitle}`}>
            Details. Designs. Experiences.
          </h1>
          <p className={styles.heroSubtitle}>
            From the moment we meet, we want to learn all about you and your event.
            Let us guide you through endless possibilities.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className={`section ${styles.intro}`}>
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <p className={styles.introText}>
            From the moment we meet for your event, we want to learn all about you!
            Let us guide you through endless possibilities of making your event become
            truly everything you can imagine and more. Have some fun and crazy ideas?
            That is our specialty! We will customize each event to your liking.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className={styles.servicesList}>
        <div className="container">
          {services.map((service, idx) => (
            <div
              key={service.slug}
              className={`${styles.serviceBlock} ${idx % 2 === 1 ? styles.serviceReverse : ''}`}
            >
              <div className={styles.serviceImage}>
                <img src={service.image} alt={service.title} loading="lazy" />
              </div>
              <div className={styles.serviceContent}>
                <span className="label">Service {idx + 1}</span>
                <h2 className={`heading ${styles.serviceTitle}`}>{service.title}</h2>
                <p className={styles.serviceDesc}>{service.description}</p>
                <ul className={styles.featureList}>
                  {service.features.map((f, i) => (
                    <li key={i} className={styles.featureItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn btn--primary">
                  Inquire About This Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
