import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './category.module.css';

const rentalCategories = {
  'accessories-and-props': {
    title: 'Accessories & Props',
    description: 'The finishing touches that tie everything together. Ring pillows, flower girl baskets, table numbers, frames, and more.',
    images: [
      { src: '/images/rentals/accessories_1.png', alt: 'Accessories and Props catalog page 1' },
      { src: '/images/rentals/accessories_2.png', alt: 'Accessories and Props catalog page 2' },
      { src: '/images/rentals/accessories_3.png', alt: 'Accessories and Props catalog page 3' },
      { src: '/images/rentals/accessories_4.png', alt: 'Accessories and Props catalog page 4' },
      { src: '/images/rentals/accessories_5.png', alt: 'Accessories and Props catalog page 5' },
      { src: '/images/rentals/accessories_6.png', alt: 'Accessories and Props catalog page 6' },
      { src: '/images/rentals/accessories_7.png', alt: 'Accessories and Props catalog page 7' },
    ],
  },
  'custom-props': {
    title: 'Custom Prop Fabrications',
    description: 'If you can dream it, we can build it. Custom backdrops, photo booth props, themed decorations, and unique installations.',
    images: [
      { src: '/images/rentals/custom_props_1.png', alt: 'Custom Fabrication catalog page 1' },
      { src: '/images/rentals/custom_props_2.png', alt: 'Custom Fabrication catalog page 2' },
    ],
  },
  'lanterns-lamps-and-chandeliers': {
    title: 'Lanterns, Lamps & Chandeliers',
    description: 'Statement lighting pieces that transform any venue. Vintage lanterns, crystal chandeliers, and everything in between.',
    images: [
      { src: '/images/rentals/lanterns_1.png', alt: 'Lanterns, Lamps and Chandeliers catalog page 1' },
      { src: '/images/rentals/lanterns_2.png', alt: 'Lanterns, Lamps and Chandeliers catalog page 2' },
    ],
  },
  'candelabras': {
    title: 'Candelabras',
    description: 'Elegant candelabras in various styles, from classic crystal to rustic iron, perfect for adding ambiance to any event.',
    images: [
      { src: '/images/rentals/candelabras_1.png', alt: 'Candelabras catalog' },
    ],
  },
  'cake-stands-and-service-ware': {
    title: 'Cake Stands & Service Ware',
    description: 'Beautiful cake stands and dessert displays that make your confections the centerpiece of the celebration.',
    images: [
      { src: '/images/rentals/cakestands_1.png', alt: 'Cake Stands and Service Ware catalog page 1' },
      { src: '/images/rentals/cakestands_2.png', alt: 'Cake Stands and Service Ware catalog page 2' },
    ],
  },
  'vases': {
    title: 'Vases',
    description: 'From tall cylinder vases to mercury glass and vintage compotes, we have the perfect vessel for your floral arrangements.',
    images: [
      { src: '/images/rentals/vases_1.png', alt: 'Vases catalog page 1' },
      { src: '/images/rentals/vases_2.png', alt: 'Vases catalog page 2' },
      { src: '/images/rentals/vases_3.png', alt: 'Vases catalog page 3' },
    ],
  },
  'candle-holders-and-votives': {
    title: 'Candle Holders & Votives',
    description: 'Set the mood with our collection of candle holders and votives in glass, metal, and mercury finishes.',
    images: [
      { src: '/images/rentals/candle_holders_1.png', alt: 'Candle Holders and Votives catalog page 1' },
      { src: '/images/rentals/candle_holders_2.png', alt: 'Candle Holders and Votives catalog page 2' },
      { src: '/images/rentals/candle_holders_3.png', alt: 'Candle Holders and Votives catalog page 3' },
      { src: '/images/rentals/candle_holders_4.png', alt: 'Candle Holders and Votives catalog page 4' },
    ],
  },
  'trees-twigs-and-topiaries': {
    title: 'Trees, Twigs & Topiaries',
    description: 'Natural elements to bring the outdoors into your event. Manzanita branches, topiaries, birch poles, and more.',
    images: [
      { src: '/images/rentals/trees_1.png', alt: 'Trees, Twigs and Topiaries catalog page 1' },
      { src: '/images/rentals/trees_2.png', alt: 'Trees, Twigs and Topiaries catalog page 2' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(rentalCategories).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = rentalCategories[slug];
  if (!category) return {};
  return {
    title: `${category.title} Rentals`,
    description: category.description,
  };
}

export default async function RentalCategory({ params }) {
  const { category: slug } = await params;
  const category = rentalCategories[slug];
  if (!category) notFound();

  return (
    <>
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <Link href="/rentals" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Return to Rentals
          </Link>
          <h1 className={`display ${styles.title}`}>{category.title}</h1>
          <p className={styles.description}>{category.description}</p>
        </div>
      </section>

      {/* Catalog Images */}
      <section className={`section ${styles.catalog}`}>
        <div className="container container--narrow">
          <div className={styles.catalogGrid}>
            {category.images.map((img, idx) => (
              <div key={idx} className={styles.catalogItem}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section section--alt`}>
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <h2 className={`display ${styles.ctaHeading}`}>
            Interested in These Items?
          </h2>
          <p className={styles.ctaText}>
            Schedule a warehouse tour to see these items in person and discuss
            how they can complement your event design.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn--primary btn--large">
              Schedule a Visit
            </Link>
            <Link href="/rentals" className="btn btn--outline btn--large">
              Browse Other Categories
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
