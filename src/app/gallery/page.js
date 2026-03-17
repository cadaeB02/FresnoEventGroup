'use client';

import { useState } from 'react';
import styles from './gallery.module.css';

const galleryImages = [
  { src: '/images/event_stone_archway.jpg', alt: 'Elegant wedding portrait in stone archway', category: 'weddings' },
  { src: '/images/event_wedding_table.jpg', alt: 'Beautiful bride and groom outdoor ceremony', category: 'weddings' },
  { src: '/images/event_wedding_party.jpg', alt: 'Wedding party celebration outdoors', category: 'weddings' },
  { src: '/images/event_rainy_wedding.jpg', alt: 'Event celebration at venue', category: 'events' },
  { src: '/images/event_ceremony_setup.jpg', alt: 'Wedding ceremony setup', category: 'weddings' },
  { src: '/images/event_paris_gala.jpg', alt: 'Corporate event setup', category: 'events' },
  { src: '/images/event_farm_table.jpg', alt: 'Wedding reception decor', category: 'weddings' },
  { src: '/images/event_petal_toss.jpg', alt: 'Wedding couple portrait', category: 'weddings' },
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'weddings', label: 'Weddings' },
  { key: 'events', label: 'Events' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = activeFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const nextImage = () => setLightboxIdx((lightboxIdx + 1) % filtered.length);
  const prevImage = () => setLightboxIdx((lightboxIdx - 1 + filtered.length) % filtered.length);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="label">Our Portfolio</span>
          <h1 className={`display ${styles.heroTitle}`}>Gallery</h1>
          <p className={styles.heroSubtitle}>
            Every event tells a unique story. Here are some of our favorites.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterBar}>
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`${styles.filterBtn} ${activeFilter === cat.key ? styles.filterActive : ''}`}
                onClick={() => setActiveFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <div className={styles.masonryGrid}>
            {filtered.map((img, idx) => (
              <div
                key={idx}
                className={styles.galleryItem}
                onClick={() => openLightbox(idx)}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className={styles.galleryItemOverlay}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <button className={styles.lightboxPrev} onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <img
            src={filtered[lightboxIdx].src}
            alt={filtered[lightboxIdx].alt}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
          <button className={styles.lightboxNext} onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
