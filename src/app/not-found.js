import Link from 'next/link';

export default function NotFound() {
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
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 12vw, 8rem)',
          fontWeight: 300,
          color: 'var(--color-accent)',
          lineHeight: 1,
          display: 'block',
          marginBottom: '0.5rem',
        }}>
          404
        </span>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 300,
          color: 'var(--color-text)',
          marginBottom: '1rem',
          lineHeight: 1.1,
        }}>
          Page Not Found
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}>
          The page you are looking for does not exist or may have been moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn--primary btn--large">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn--outline btn--large">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
