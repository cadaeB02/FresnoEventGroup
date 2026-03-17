import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './slug.module.css';

const servicesData = {
  'full-service-planning': {
    title: 'Full Service Planning and Design',
    subtitle: 'The Ultimate Wedding Planning Experience',
    image: '/images/event_farm_table.jpg',
    description: 'This is the ultimate service. If you have a busy schedule and are feeling overwhelmed or frustrated with your event planning details, let us assist you so your dream wedding can become your reality. We will be there each step of the way to guide you so you can relax on the big day and be stress free.',
    longDescription: 'Our Full Service Planning package is designed for couples who want a completely hands-off planning experience. From the moment you book with us, our team becomes your personal event planning concierge. We handle every detail, from vendor selection to day-of coordination, ensuring that your vision comes to life exactly as you imagined.',
    features: [
      'Unlimited personal face-to-face, phone and email consultations',
      'Assistance with locating and contracting ceremony and reception venues',
      'Vendor recommendations for every wedding related aspect',
      'Access to exclusive rental items from our 3,000 sq ft warehouse',
      'Expert design process to fit your customized needs',
      'Personalized rehearsal, wedding day schedule and ceremony timelines',
      'Catering menu selection, tasting and negotiations',
      'Expert knowledge of contract review and arrangements',
      'Coordination of wedding rehearsal and rehearsal dinner',
      'All Wedding Day Management services included',
      'Budget management and tracking',
      'RSVP tracking and seating chart assistance',
    ],
  },
  'wedding-day-management': {
    title: 'Wedding Day Management',
    subtitle: 'Your Day, Stress-Free',
    image: '/images/event_ceremony_setup.jpg',
    description: 'The day of your wedding needs to be a fun and joyous time. You can be at ease with your significant other and loved ones and have us manage all the nitty gritty details.',
    longDescription: 'Already have your vendors booked and your plans in place? Our Wedding Day Management service is perfect for the organized couple who just needs a professional team to execute on the big day. We step in before the wedding to review all your plans, create a detailed timeline, and then manage every moment from setup to send-off.',
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
      'Two pre-wedding planning meetings',
      'Final venue walkthrough',
    ],
  },
  'corporate-events': {
    title: 'Social and Corporate Event Planning',
    subtitle: 'From Intimate Dinners to Grand Galas',
    image: '/images/event_paris_gala.jpg',
    description: 'Your social soirees and corporate events are unique fun celebrations that we love to be a part of. Whether it be an intimate dinner party or a lavish corporate gala we will guide you with consultations to create the most memorable event ever.',
    longDescription: 'Team FEG is versed in both small intimate gatherings as well as large corporate events with over 3,000 guests. Our experience in the non-profit sector and corporate world gives us a unique perspective on event logistics, branding integration, and guest management at any scale.',
    features: [
      'Custom event design and theming',
      'Venue selection and coordination',
      'Vendor management and negotiations',
      'Day-of coordination and management',
      'Corporate branding integration',
      'Entertainment and program coordination',
      'Gala and fundraiser experience',
      'Guest management for events up to 3,000+',
      'Budget planning and vendor negotiations',
      'Post-event wrap-up and reporting',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} style={{ backgroundImage: `url(${service.image})` }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Link href="/services" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            All Services
          </Link>
          <h1 className={`display ${styles.heroTitle}`}>{service.title}</h1>
          <p className={styles.heroSubtitle}>{service.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className={`section ${styles.content}`}>
        <div className="container container--narrow">
          <div className={styles.contentGrid}>
            <div className={styles.description}>
              <p className={styles.descLead}>{service.description}</p>
              <p className={styles.descBody}>{service.longDescription}</p>
            </div>

            <div className={styles.features}>
              <h2 className={styles.featuresTitle}>What&apos;s Included</h2>
              <ul className={styles.featureList}>
                {service.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
