import '../styles/globals.scss'
import "../styles/slick-carousel/slick.css"; 
import "../styles/slick-carousel/slick-theme.css";
import "../styles/slick-carousel/slick-overrides.scss";

import type { AppProps } from 'next/app'
import GoogleAnalytics from '../components/analytics/google-analytics';
import { GA_TRACKING_ID } from '../lib/gtag';

function MyApp({ Component, pageProps }: AppProps) {
  const isProduction = process.env.NODE_ENV === "production";
  
  //TODO: REMOVE THIS
  console.log("GA_TRACKING_ID: ", GA_TRACKING_ID, ", Direct from env: ", process.env.GA_TRACKING_ID, ", environment: ", process.env.NODE_ENV);
  console.log("SS_NAME_ARTICLES: ", process.env.SS_NAME_ARTICLE);
  
  return (
    <>
      { isProduction && <GoogleAnalytics /> }
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
