import { Metadata } from 'next';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: '404 - Page not found',
  description: 'Sorry, the page you are looking for does not exist',
  openGraph: {
    type: 'website',
    url: 'https://08-zustand-nine-sigma.vercel.app/',
    title: '404 - Page not found',
    description: 'Sorry, the page you are looking for does not exist',
    siteName: 'Note Hub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page not found',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
