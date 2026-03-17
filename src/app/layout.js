import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeedbackWidget from '@/components/FeedbackWidget';

export const metadata = {
  title: {
    default: 'Fresno Event Group — Event Planning & Design',
    template: '%s | Fresno Event Group',
  },
  description: 'Fresno Event Group provides full-service event planning, wedding coordination, and corporate event design in Fresno and the Central Valley. Fun. Fabulous. Fresh.',
  keywords: ['event planning', 'wedding planner', 'Fresno', 'Central Valley', 'event design', 'wedding coordinator', 'corporate events'],
  openGraph: {
    title: 'Fresno Event Group — Event Planning & Design',
    description: 'Full-service event planning, wedding coordination, and corporate event design in Fresno and the Central Valley.',
    url: 'https://www.fresnoeventgroup.com',
    siteName: 'Fresno Event Group',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FeedbackWidget />
      </body>
    </html>
  );
}
