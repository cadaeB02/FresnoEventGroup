'use client';

import { useState } from 'react';
import styles from './gallery.module.css';

const galleryImages = [
  { src: 'https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5a93782bec212d9451f7633c/1519613999539/289.jpg', alt: 'Elegant wedding portrait in stone archway', category: 'weddings' },
  { src: 'https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5a272c50e2c483cf8718269a/1512516699910/Nicki++Matt_283_w_full.jpg', alt: 'Beautiful bride and groom outdoor ceremony', category: 'weddings' },
  { src: 'https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5c3ba8244fa51afb62d1561b/1547413553563/Sneak+Peeks-0006+resize.jpg', alt: 'Wedding party celebration outdoors', category: 'weddings' },
  { src: 'https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5a77790671c10bcbfb8dfc27/1611958639863/16265207_10155870498657818_9198860857523937196_n.jpg', alt: 'Event celebration at venue', category: 'events' },
  { src: 'https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5a399b62085229908fb9ffd6/1513724774311/18765867_10209361185002628_4222052745932842814_n.jpg', alt: 'Wedding ceremony setup', category: 'weddings' },
  { src: 'https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5a39ac4a71c10b1cd4ccf4a2/1513729103519/11026199_1074314492594830_2426318677805836382_n.jpg', alt: 'Corporate event setup', category: 'events' },
  { src: 'https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5c3bb19b1ae6cfa74d6882e0/1547415968424/dc+photography+studios.jpg', alt: 'Wedding reception decor', category: 'weddings' },
  { src: 'https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5a272a71e2c483cf87182279/1512516219627/Charlotte+and+Clark_389_w_full.jpg', alt: 'Beautiful wedding ceremony outdoors', category: 'weddings' },
  { src: 'https://static1.squarespace.com/static/5a2705c049fc2b02ff813561/t/5a399165419202af3257a637/1513722233523/Nicki++Matt_284_w_full.jpg', alt: 'Wedding couple portrait', category: 'weddings' },
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
