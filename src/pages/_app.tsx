import '../styles/globals.scss'
import "../styles/slick-carousel/slick.css"; 
import "../styles/slick-carousel/slick-theme.css";
import "../styles/slick-carousel/slick-overrides.scss";

import type { AppProps } from 'next/app'
import GoogleAnalytics from '../components/analytics/google-analytics';

function MyApp({ Component, pageProps }: AppProps) {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <>
      { isProduction && <GoogleAnalytics /> }
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
