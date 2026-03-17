'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Ashley',
    date: 'June 2023',
    rating: 5,
    quote: 'Our guests keep calling our wedding the best wedding they\'ve ever been to and I truly owe that all to the Fresno Event Group! They turned our wedding into a live Pinterest board. Every single detail and idea we had was brought to life in a way that was a billion times better than we could have imagined.',
  },
  {
    name: 'Czd',
    date: 'February 2022',
    rating: 5,
    quote: 'They were great and very professional, going above and beyond what we had hired them for. Our original venue fell through because of the wildfires, just a week before our date. They didn\'t even bat an eye when we said we still wanted to push through at another venue.',
  },
  {
    name: 'Kirstin',
    date: 'January 2020',
    rating: 5,
    quote: 'Barb and her amazing team go above and beyond in all aspects of wedding coordination. FEG\'s exemplary service allowed me to truly relax and enjoy being a bride without worrying about every detail. Every time I look back on my Wedding, I still think it was absolutely perfect.',
  },
  {
    name: 'Michelle',
    date: 'November 2018',
    rating: 5,
    quote: 'She paired us with fabulous local artisan vendors, she styled our event better than we ever could have done, and all of this within our budget! Our day ran so smoothly we enjoyed every minute of it! We came to you as customers and left as friends!',
  },
  {
    name: 'Nicki',
    date: 'May 2018',
    rating: 5,
    quote: 'They never once came to tell me if anything was going wrong, they just handled it. I was super relaxed on my own wedding day thanks to FEG! Barb\'s whole team was there from the moment the tent went up until the tent came down on Sunday after the wedding was over.',
  },
  {
    name: 'Jaclyn',
    date: 'August 2018',
    rating: 5,
    quote: 'Not only did Barbara and her crew go beyond the line of duty, they are forever family to us! Her contacts and expertise are second to none. We told FEG our vision of our dream wedding and they made it come true and then some!',
  },
];

function Stars({ count }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--color-accent)" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <section className={`section ${styles.testimonials}`}>
      <div className="container container--narrow">
        <div className={styles.header}>
          <span className="label">Client Reviews</span>
          <h2 className={`display ${styles.heading}`}>
            What Our Clients Say
          </h2>
          <div className={styles.badge}>
            <Stars count={5} />
            <span className={styles.badgeText}>5.0 on WeddingWire</span>
            <span className={styles.badgeCount}>19 Reviews</span>
          </div>
        </div>

        <div
          className={styles.carousel}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className={styles.card}>
            <svg className={styles.quoteIcon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.3">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
            </svg>
            <p className={styles.quote}>{testimonials[current].quote}</p>
            <div className={styles.reviewer}>
              <div className={styles.reviewerInitial}>
                {testimonials[current].name[0]}
              </div>
              <div>
                <span className={styles.reviewerName}>{testimonials[current].name}</span>
                <span className={styles.reviewerDate}>{testimonials[current].date}</span>
              </div>
              <Stars count={testimonials[current].rating} />
            </div>
          </div>

          <div className={styles.controls}>
            <button onClick={prev} className={styles.navBtn} aria-label="Previous review">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div className={styles.dots}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.dot} ${idx === current ? styles.dotActive : ''}`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className={styles.navBtn} aria-label="Next review">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.weddingWireLink}>
          <a
            href="https://www.weddingwire.com/reviews/fresno-event-group-fresno/c502d649b5ddfe68.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read all 19 reviews on WeddingWire
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
