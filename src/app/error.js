'use client';

import Link from 'next/link';

export default function Error({ error, reset }) {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      background: 'var(--color-bg)',
    }}>
      <div style={{ maxWidth: '520px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 300,
          color: 'var(--color-text)',
          marginBottom: '1rem',
          lineHeight: 1.1,
        }}>
          Something Went Wrong
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}>
          We hit an unexpected issue loading this page. Please try again, or head back to the homepage.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => reset()}
            className="btn btn--primary btn--large"
          >
            Try Again
          </button>
          <Link href="/" className="btn btn--outline btn--large">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
