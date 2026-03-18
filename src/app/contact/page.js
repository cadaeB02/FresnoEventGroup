'use client';

import { useState } from 'react';
import styles from './contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventType: '', eventDate: '', guestCount: '', message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Contact form is not connected to a backend yet.
    // Before wiring this up, we need to find out what API or plugin
    // the previous fresnoeventgroup.com site was using to handle
    // contact form submissions, so we can use the same service
    // (or migrate to a new one that works with this Next.js setup).
    // Options include: Formspree, EmailJS, SendGrid, or a custom API route.
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="label">Get in Touch</span>
          <h1 className={`display ${styles.heroTitle}`}>
            Let&apos;s Start Planning
          </h1>
          <p className={styles.heroSubtitle}>
            We would love to hear about your event vision. Reach out and let&apos;s
            create something unforgettable together.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`section ${styles.contactSection}`}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Form */}
            <div className={styles.formWrapper}>
              <h2 className={`heading ${styles.formTitle}`}>Send Us a Message</h2>
              <p className={styles.formSubtitle}>
                Fill out the form below and we will get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className={styles.successMessage}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <h3>Thank You!</h3>
                  <p>Your message has been received. We will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.formLabel}>Full Name *</label>
                      <input
                        type="text" id="name" name="name" required
                        value={formData.name} onChange={handleChange}
                        className={styles.formInput}
                        placeholder="Your name"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.formLabel}>Email *</label>
                      <input
                        type="email" id="email" name="email" required
                        value={formData.email} onChange={handleChange}
                        className={styles.formInput}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.formLabel}>Phone</label>
                      <input
                        type="tel" id="phone" name="phone"
                        value={formData.phone} onChange={handleChange}
                        className={styles.formInput}
                        placeholder="(559) 000-0000"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="eventType" className={styles.formLabel}>Event Type</label>
                      <select
                        id="eventType" name="eventType"
                        value={formData.eventType} onChange={handleChange}
                        className={styles.formInput}
                      >
                        <option value="">Select event type</option>
                        <option value="wedding">Wedding</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="social">Social Event</option>
                        <option value="nonprofit">Non-Profit Event</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="eventDate" className={styles.formLabel}>Event Date</label>
                      <input
                        type="date" id="eventDate" name="eventDate"
                        value={formData.eventDate} onChange={handleChange}
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="guestCount" className={styles.formLabel}>Estimated Guest Count</label>
                      <input
                        type="number" id="guestCount" name="guestCount"
                        value={formData.guestCount} onChange={handleChange}
                        className={styles.formInput}
                        placeholder="150"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.formLabel}>Tell Us About Your Event *</label>
                    <textarea
                      id="message" name="message" required rows={5}
                      value={formData.message} onChange={handleChange}
                      className={styles.formTextarea}
                      placeholder="Share your vision, ideas, and any details you'd like us to know..."
                    />
                  </div>

                  <button type="submit" className="btn btn--primary btn--large">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Contact Information</h3>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Phone</span>
                    <a href="tel:5597098603" className={styles.infoValue}>559.709.8603</a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Email</span>
                    <a href="mailto:barb@fresnoeventgroup.com" className={styles.infoValue}>barb@fresnoeventgroup.com</a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Office</span>
                    <span className={styles.infoValue}>360 W. Bedford #103<br/>Fresno, CA 93711</span>
                  </div>
                </div>
              </div>

              <div className={styles.socialCard}>
                <h3 className={styles.infoCardTitle}>Follow Us</h3>
                <div className={styles.socialLinks}>
                  <a
                    href="https://www.instagram.com/fresnoeventgroup/"
                    target="_blank" rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/FresnoEventGroup/"
                    target="_blank" rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>

              <div className={styles.hoursCard}>
                <h3 className={styles.infoCardTitle}>Business Hours</h3>
                <p className={styles.hoursText}>
                  By appointment only. We are available for consultations
                  Monday through Friday, and on weekends by special arrangement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
