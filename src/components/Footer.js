import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* CTA Banner */}
      <div className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div className={styles.ctaContent}>
              <span className="label">Ready to Start Planning?</span>
              <h2 className={`display ${styles.ctaHeading}`}>
                Let&apos;s Create Something Unforgettable
              </h2>
              <p className={styles.ctaText}>
                From intimate gatherings to grand celebrations, Team FEG is ready to bring your vision to life.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn--primary btn--large">
                Get in Touch
              </Link>
              <a href="tel:5597098603" className="btn btn--outline btn--large">
                Call 559.709.8603
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className={styles.footerMain}>
        <div className="container">
          <div className={styles.footerGrid}>
            {/* Brand */}
            <div className={styles.footerBrand}>
              <h3 className={styles.footerLogo}>Fresno Event Group</h3>
              <p className={styles.footerTagline}>Fun. Fabulous. Fresh.</p>
              <div className={styles.socialLinks}>
                <a
                  href="https://www.instagram.com/fresnoeventgroup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/FresnoEventGroup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Quick Links</h4>
              <nav className={styles.footerNav}>
                <Link href="/about">About Us</Link>
                <Link href="/services">Services</Link>
                <Link href="/gallery">Gallery</Link>
                <Link href="/rentals">Rentals</Link>
                <Link href="/contact">Contact</Link>
              </nav>
            </div>

            {/* Services */}
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Our Services</h4>
              <nav className={styles.footerNav}>
                <Link href="/services/full-service-planning">Full Service Planning</Link>
                <Link href="/services/wedding-day-management">Wedding Day Management</Link>
                <Link href="/services/corporate-events">Corporate Events</Link>
              </nav>
            </div>

            {/* Contact */}
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Get in Touch</h4>
              <div className={styles.contactInfo}>
                <a href="tel:5597098603" className={styles.contactItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  559.709.8603
                </a>
                <a href="mailto:barb@fresnoeventgroup.com" className={styles.contactItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  barb@fresnoeventgroup.com
                </a>
                <span className={styles.contactItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  360 W. Bedford #103, Fresno, CA 93711
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.footerBottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p>&copy; {currentYear} Fresno Event Group. All rights reserved.</p>
            <p className={styles.credits}>
              Serving Fresno and the Central Valley since 2009
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
