// import "@/styles/globals.css";
// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

// pages/_app.tsx

import "@/styles/globals.css";
import GoogleAnalytics from "@/components/GoogleAnalitycs/GoogleAnalytics";
import Head from "next/head";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '@/config/gtag';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div>
      <Head>
        <title>Casa del Twingo</title>
      </Head>

      <Component {...pageProps} />
      <GoogleAnalytics />
    </div>
  );
}
