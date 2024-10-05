// import type { AppProps } from 'next/app'
 
// export default function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Gyanoda - Your premier platform for WBJEE, NEET, and more. Expert teachers, quality courses, and comprehensive exam preparation for students." />
        <meta name="keywords" content="WBJEE, NEET, exam preparation, online courses, video lectures, mock tests" />
        <meta name="author" content="Gyanoda" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gyanoda.com/" />
        <meta property="og:title" content="Gyanoda - Expert Exam Preparation" />
        <meta property="og:description" content="Comprehensive exam preparation for WBJEE, NEET, and more. Join Gyanoda for quality courses and expert guidance." />
        <meta property="og:image" content="https://gyanoda.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://gyanoda.com/" />
        <meta property="twitter:title" content="Gyanoda - Expert Exam Preparation" />
        <meta property="twitter:description" content="Comprehensive exam preparation for WBJEE, NEET, and more. Join Gyanoda for quality courses and expert guidance." />
        <meta property="twitter:image" content="https://gyanoda.com/twitter-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="../public/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../public/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="../public/favicon-16x16.png" />
        <link rel="manifest" href="../public/site.webmanifest" />

        {/* You can add more global meta tags here */}
      </Head>
      <Component {...pageProps} />
    </>
  )
}